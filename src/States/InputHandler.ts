import {IStateMachine} from "./IStateMachine"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Commands} from "../Commands/Commands"
import {ExitState} from "./ExitState"
import {CommandFactory} from "../Factories/CommandFactory"
import {IInput} from "../Models/IInput"
import {DisplayInventoryCommand} from "../Commands/DisplayInventoryCommand"
import {Action} from "../Actions/Action"

export class InputHandler {

    private readonly stateMachine: IStateMachine
    private readonly handleNumberInput: () => void
    private readonly model: IModel
    private readonly view: IView
    private input: IInput

    constructor(stateMachine: IStateMachine, model: IModel, view: IView, handleNumberInput: () => void) {
        this.handleNumberInput = handleNumberInput
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
        this.input = this.model.getInput()
    }

    enter(): void {
        switch (this.input.getValue()) {
            case Commands.EXIT_KEY:
                this.stateMachine.enter(ExitState)
                break
            case Commands.DISPLAY_INVENTORY_KEY:
                const command = new DisplayInventoryCommand(this.model, this.stateMachine, this.view)
                if (command) command.execute()
                break
            default:
                this.handleNumberInput()
        }
    }

    exit(): void {
        this.input.resetInput()
    }

    isNotCorrectInput(input: number, countCurrentActions: number): boolean {
        return isNaN(input) || input < 1 || input > countCurrentActions
    }

    createCommandFromInputData(): ICommand | null {

        const inputData = parseInt(this.input.getValue())
        const currentActions = this.model.getCurrentActions()
        const countCurrentActions = currentActions.length

        if (this.isNotCorrectInput(inputData, countCurrentActions)) {
            const actionsInputText = countCurrentActions > 0 ? `число от 1 до ${countCurrentActions} или ` : ``
            this.view.displayText(`Неверный ввод. Введите ${actionsInputText}"${Commands.EXIT_KEY}" для выхода`)
            this.view.displayActions(currentActions)
            return null
        }

        const inputAction = currentActions[inputData-1]
        if (!inputAction) {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${Commands.EXIT_KEY}" для выхода`)
            return null
        }

        const command = CommandFactory.createCommand(inputAction, this.model, this.stateMachine, this.view)
        if (!command) {
            this.view.displayText(`Отсутствует команда выбранного действия, введите другое значение или "${Commands.EXIT_KEY}" для выхода`)
        }

        return command
    }
}