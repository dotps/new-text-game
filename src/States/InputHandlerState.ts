import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {IOService} from "../Services/IOService";
import {ExitState} from "./ExitState";
import {InputState} from "./InputState";
import {Logger} from "../Utils/Logger"

export class InputHandlerState implements IState {

    private _stateMachine: StateMachine
    private _model: IModel
    private _inputOutputService: IOService
    private _isRunning: boolean = true

    constructor(stateMachine: StateMachine, model: IModel, inputOutputService: IOService) {
        this._stateMachine = stateMachine
        this._model = model
        this._inputOutputService = inputOutputService;
    }

    async enter(): Promise<void> {
        Logger.log("enter " + this.constructor.name)

        if (this._model.currentInput === "") return

        switch (this._model.currentInput) {
            case "exit":
                this._stateMachine.enter(ExitState)
                break
            default:
                const input = parseInt(this._model.currentInput)
                const currentActions = this._model.getCurrentActions()
                const countCurrentActions = currentActions.length

                if (this.isNotCorrectInput(input, countCurrentActions)) {
                    this._inputOutputService.displayText("Неверный ввод. Введите число от 1 до " + countCurrentActions)
                    this._stateMachine.enter(InputState)
                    return
                }
        }
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
        this._model.currentInput = ""
    }

    private isNotCorrectInput(input: number, countCurrentCommands: number): boolean {
        return isNaN(input) || input < 1 || input > countCurrentCommands
    }
}