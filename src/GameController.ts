import {IController} from "./IController"
import {IModel} from "./IModel"
// import {ActionData} from "./ActionData"
import {IView} from "./IView"
import {ActionData} from "./ActionData"
import {IIOService} from "./IIOService"

export class GameController implements IController {

    private _model: IModel
    private _ioService: IIOService
    private _view: IView
    private _isRunning = true

    constructor(model: IModel, view: IView, ioService: IIOService) {
        this._model = model
        this._view = view
        this._ioService = ioService
        this.init()
    }

    init() {

    }

    public async run() {

        const actionData = this._model.getStartData()
        this._view.displayScreen(actionData)

        while (this._isRunning) {
            const responseData = await this._ioService.getInput("You answer > ")
            this._view.displayScreen(responseData)
            if (responseData.inputData?.toLowerCase() === 'exit') {
                this._isRunning = false
            }
        }

        this._ioService.close()
    }
}

