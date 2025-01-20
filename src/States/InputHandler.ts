import {IStateMachine} from "./IStateMachine"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Commands} from "../Commands/Commands"
import {ExitState} from "./ExitState"
import {InputState} from "./InputState"
import {CommandFactory} from "../Factories/CommandFactory"

export class InputHandler {

    private readonly stateMachine: IStateMachine
    private readonly model: IModel
    private readonly view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }

    async enter(handleNumberInput: () => void): Promise<void> {

        if (this.model.currentInput === "") return

        switch (this.model.currentInput) {
            case Commands.EXIT:
                this.stateMachine.enter(ExitState)
                break
            default:
                handleNumberInput()
        }
    }

    exit(): void {
        this.model.resetCurrentInput()
    }

    isNotCorrectInput(input: number, countCurrentActions: number): boolean {
        return isNaN(input) || input < 1 || input > countCurrentActions
    }

    getCommand(): ICommand | null {

        const input = parseInt(this.model.currentInput)
        const currentActions = this.model.getCurrentActions()
        const countCurrentActions = currentActions.length

        if (this.isNotCorrectInput(input, countCurrentActions)) {
            const actionsInputText = countCurrentActions > 0 ? `число от 1 до ${countCurrentActions} или ` : ``
            this.view.displayText(`Неверный ввод. Введите ${actionsInputText}"${Commands.EXIT}" для выхода`)
            this.view.displayActions(currentActions)
            return null
        }

        const inputAction = currentActions[input-1]

        if (!inputAction) {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${Commands.EXIT}" для выхода`)
            return null
        }

        const command = CommandFactory.createCommand(inputAction, this.model, this.stateMachine, this.view)

        if (!command) {
            this.view.displayText(`Отсутствует команда выбранного действия, введите другое значение или "${Commands.EXIT}" для выхода`)
        }

        return command
    }
}