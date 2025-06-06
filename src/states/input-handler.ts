import {IModel} from "../models/model.interface"
import {IView} from "../views/view.interface"
import {IInput} from "../models/input.interface"
import {IStateMachine} from "./state-machine.interface"
import {Commands} from "../commands/commands"
import {ExitState} from "./exit.state"
import {DisplayInventoryCommand} from "../commands/display-inventory.command"
import {ICommand} from "../commands/command.interface"
import {CommandFactory} from "../factories/command.factory"

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
            case Commands.ExitKey:
                this.stateMachine.enter(ExitState)
                break
            case Commands.DisplayInventoryKey:
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
            this.view.displayText(`Неверный ввод. Введите ${actionsInputText}"${Commands.ExitKey}" для выхода`)
            this.view.displayActions(currentActions)
            return null
        }

        const inputAction = currentActions[inputData-1]
        if (!inputAction) {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${Commands.ExitKey}" для выхода`)
            return null
        }

        const command = CommandFactory.createCommand(inputAction, this.model, this.stateMachine, this.view)
        if (!command) {
            this.view.displayText(`Отсутствует команда выбранного действия, введите другое значение или "${Commands.ExitKey}" для выхода`)
        }

        return command
    }
}