import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {IOService} from "../Services/IOService";
import {InputHandlerState} from "./InputHandlerState";
import {Logger} from "../Utils/Logger"

export class InputState implements IState {

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

        const responseData = await this._inputOutputService.getInput("> ")
        Logger.log(responseData)

        if (responseData) {
            this._model.currentInput = responseData.inputData ? responseData.inputData.toLowerCase().trim() : ""
            this._stateMachine.enter(InputHandlerState)
        }
        else {
            this._stateMachine.enter(InputState)
        }
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }
}