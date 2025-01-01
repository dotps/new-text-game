import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {IOService} from "../Services/IOService";
import {ExitState} from "./ExitState";
import {InputState} from "./InputState";

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
        console.log("enter " + this.constructor.name)

        if (this._model.currentInput === "") return

        switch (this._model.currentInput) {
            case "exit":
                this._stateMachine.enter(ExitState)
                break
            default:
                this._stateMachine.enter(InputState)
        }
    }

    exit(): void {
        console.log("exit " + this.constructor.name)
        this._model.currentInput = ""
    }
}