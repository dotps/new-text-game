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

        // TODO: проверить в модели соответствия введенной команды и доступных действий на текущей локации

        switch (this._model.currentInput) {
            case "exit":
                this._stateMachine.enter(ExitState)
                break
            default:
                // Если currentInput сответствует команде, то применить эту команду
                console.log(this._model.currentInput)
                // TODO: привести в число, проверить на возможность выполнения (в ведены поспустимые символы)
                //  и запустить команду

                this._model.applyAction()
                // this._stateMachine.enter(InputState)
        }
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
        this._model.currentInput = ""
    }
}