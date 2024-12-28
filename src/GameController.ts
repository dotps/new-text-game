import {IController} from "./IController"
import {IModel} from "./IModel"
import {IView} from "./IView"
import {IIOService} from "./IIOService"
import {StateMachine} from "./States/StateMachine"
import {BootstrapState} from "./States/BootstrapState";

export class GameController implements IController {

    private _model: IModel
    private _ioService: IIOService
    private _view: IView
    private _isRunning = true
    private _stateMachine: StateMachine;

    constructor(model: IModel, view: IView, stateMachine: StateMachine, ioService: IIOService) {
        this._model = model
        this._view = view
        this._stateMachine = stateMachine
        this._ioService = ioService
        this.init()
    }

    init() {
        this._stateMachine.enter(BootstrapState)
    }

    public async run() {

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

