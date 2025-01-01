import {IController} from "./IController"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {StateMachine} from "../States/StateMachine"
import {BootstrapState} from "../States/BootstrapState";
import {IOService} from "../Services/IOService";

export class GameController implements IController {

    private _model: IModel
    private _ioService: IOService
    private _view: IView
    private _isRunning = true
    private _stateMachine: StateMachine;

    constructor(model: IModel, view: IView, stateMachine: StateMachine, ioService: IOService) {
        this._model = model
        this._view = view
        this._stateMachine = stateMachine
        this._ioService = ioService
    }

    public async run() {

        this._stateMachine.enter(BootstrapState)

        const actionData = this._model.getStartData()
        this._view.update(actionData)

        while (this._isRunning) {
            const responseData = await this._ioService.getInput("You answer > ")
            this._view.update(responseData)
            if (responseData.inputData?.toLowerCase() === 'exit') {
                this._isRunning = false
            }
        }

        this._ioService.close()
    }
}

