import {IModel} from "../Models/IModel"
import {ExitState} from "./ExitState";
import {InputState} from "./InputState";
import {IView} from "../Views/IView"
import {Commands} from "../Commands/Commands"
import {CommandFactory} from "../Factories/CommandFactory"
import {IStateMachine} from "./IStateMachine"

export class InputHandlerState implements IState {

    private readonly stateMachine: IStateMachine
    private readonly model: IModel
    private readonly view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }

    async enter(): Promise<void> {

        if (this.model.currentInput === "") return

        switch (this.model.currentInput) {
            case Commands.EXIT:
                this.stateMachine.enter(ExitState)
                break
            default:
                this.handleNumberInput()
        }
    }

    private handleNumberInput() {
        const input = parseInt(this.model.currentInput)
        const currentActions = this.model.getCurrentActions()
        const countCurrentActions = currentActions.length

        if (this.isNotCorrectInput(input, countCurrentActions)) {
            const actionsInputText = countCurrentActions > 0 ? `число от 1 до ${countCurrentActions} или ` : ``
            this.view.displayText(`Неверный ввод. Введите ${actionsInputText}"${Commands.EXIT}" для выхода`)
            this.view.displayActions(currentActions)
            this.stateMachine.enter(InputState)
            return
        }

        const inputAction = currentActions[input-1]

        if (!inputAction) {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${Commands.EXIT}" для выхода`)
            this.stateMachine.enter(InputState)
            return
        }

        const command = CommandFactory.createCommand(inputAction, this.model, this.stateMachine, this.view)

        if (command) {
            command.execute()
        }
        else {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${Commands.EXIT}" для выхода`)
            this.stateMachine.enter(InputState)
        }
    }

    exit(): void {
        this.model.resetCurrentInput()
    }

    private isNotCorrectInput(input: number, countCurrentActions: number): boolean {
        return isNaN(input) || input < 1 || input > countCurrentActions
    }
}