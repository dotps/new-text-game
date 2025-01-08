import {IController} from "./IController"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {StateMachine} from "../States/StateMachine"
import {InputOutputService} from "../Services/InputOutputService";
import {Services} from "../Services/Services";
import {LoadProgressState} from "../States/LoadProgressState";

export class GameController implements IController {

    private _model: IModel
    private _ioService: InputOutputService
    private _view: IView
    private _isRunning = true
    private _stateMachine: StateMachine;
    private _services: Services;

    constructor(model: IModel, view: IView, stateMachine: StateMachine, services: Services) {
        this._model = model
        this._view = view
        this._stateMachine = stateMachine
        this._services = services
        this._ioService = services.get(InputOutputService)
    }

    public async run() {
        this._stateMachine.enter(LoadProgressState)
    }
}

