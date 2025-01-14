import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {ExitState} from "./ExitState";
import {InputState} from "./InputState";
import {Logger} from "../Utils/Logger"
import {IView} from "../Views/IView"
import {commands} from "../Commands/Commands"
import {CommandFactory} from "../Commands/CommandFactory"
import {IStateMachine} from "./IStateMachine"

export class InputHandlerState implements IState {

    private readonly stateMachine: IStateMachine
    private readonly model: IModel
    private view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }

    async enter(): Promise<void> {
        Logger.log("enter " + this.constructor.name)

        if (this.model.currentInput === "") return

        switch (this.model.currentInput) {
            case commands.EXIT_COMMAND:
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
            this.view.displayText(`Неверный ввод. Введите ${actionsInputText}"${commands.EXIT_COMMAND}" для выхода`)
            this.view.displayActions(currentActions)
            this.stateMachine.enter(InputState)
            return
        }

        const inputAction = currentActions[input-1]

        if (!inputAction) {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${commands.EXIT_COMMAND}" для выхода`)
            this.stateMachine.enter(InputState)
            return
        }

        // TODO: реализовать обращение к списку команд текущей локации, который создается при смене локации
        const command = CommandFactory.createCommand(inputAction, this.model, this.stateMachine)

        if (command) {
            command.execute()
        }
        else {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${commands.EXIT_COMMAND}" для выхода`)
            this.stateMachine.enter(InputState)
        }
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
        this.model.resetCurrentInput()
    }

    private isNotCorrectInput(input: number, countCurrentActions: number): boolean {
        return isNaN(input) || input < 1 || input > countCurrentActions
    }
}