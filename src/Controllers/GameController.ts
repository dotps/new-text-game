import {IController} from "./IController"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {StateMachine} from "../States/StateMachine"
import {BootstrapState} from "../States/BootstrapState";
import {IOService} from "../Services/IOService";
import {Services} from "../Services/Services";
import {LoadProgressState} from "../States/LoadProgressState";

export class GameController implements IController {

    private _model: IModel
    private _ioService: IOService
    private _view: IView
    private _isRunning = true
    private _stateMachine: StateMachine;
    private _services: Services;

    constructor(model: IModel, view: IView, stateMachine: StateMachine, services: Services) {
        this._model = model
        this._view = view
        this._stateMachine = stateMachine
        this._services = services
        this._ioService = services.get(IOService)
    }

    public async run() {

        // this._stateMachine.enter(BootstrapState)
        this._stateMachine.enter(LoadProgressState)

        /*
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
         */
    }
}

