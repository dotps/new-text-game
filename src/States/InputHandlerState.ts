import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {InputOutputService} from "../Services/InputOutputService";
import {ExitState} from "./ExitState";
import {InputState} from "./InputState";
import {Logger} from "../Utils/Logger"
import {IView} from "../Views/IView"

export class InputHandlerState implements IState {

    private stateMachine: StateMachine
    private model: IModel
    private view: IView

    constructor(stateMachine: StateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }

    async enter(): Promise<void> {
        Logger.log("enter " + this.constructor.name)

        if (this.model.currentInput === "") return

        switch (this.model.currentInput) {
            case "exit":
                this.stateMachine.enter(ExitState)
                break
            default:
                const input = parseInt(this.model.currentInput)
                const currentActions = this.model.getCurrentActions()
                const countCurrentActions = currentActions.length

                if (this.isNotCorrectInput(input, countCurrentActions)) {
                    this.view.displayText("Неверный ввод. Введите число от 1 до " + countCurrentActions)
                    this.stateMachine.enter(InputState)
                    return
                }

                const action = this.model.getCurrentAction(input)
                console.log(action)
                // TODO: по идее не нужно засовывать логику с выбором 1..3 в model, это нужно обрабатывать здесь
                // т.е все действия из локации и проверяем на 1..3
                // при этом 1..3 уже используется во view нужно в одно место засунуть
                // попробовать заложить логику 1..3 в сам класс Action

        }
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
        this.model.currentInput = ""
    }

    private isNotCorrectInput(input: number, countCurrentCommands: number): boolean {
        return isNaN(input) || input < 1 || input > countCurrentCommands
    }
}