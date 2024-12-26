import {IController} from "./IController"
import {IModel} from "./IModel"
// import {ActionData} from "./ActionData"
import {createInterface} from "node:readline/promises"
import {IView} from "./IView"
import {ActionData} from "./ActionData"

export class ConsoleController implements IController {

    private _model: IModel
    private _ioService: any
    private _view: IView
    private _isRunning = true

    constructor(model: IModel, view: IView) {
        this._model = model
        this._view = view
        this.init()
    }

    init() {
        this.initInputOutputService()
    }

    private initInputOutputService() {
        this._ioService = createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    async read(action: ActionData): Promise<ActionData> {
        const inputData: string = await this._ioService.question(action.text + ' ')
        return {text: `Hello ${inputData}!`, inputData: inputData}
    }

    async getInput(): Promise<ActionData> {
        const inputData: string = await this._ioService.question("You answer > ")
        return {text: `Hello ${inputData}!`, inputData: inputData}
    }

    write(message: any): void {
        console.log(message.text)
    }

    public async run() {

        // Паолучить данные из model
        const actionData = this._model.getStartData()
        // послать эти данные во view
        this._view.displayScreen(actionData)

        while (this._isRunning) {
            // const response = await this.read(actionData)
            const response = await this.getInput()
            console.log(response)
            if (response.inputData?.toLowerCase() === 'exit') {
                this._isRunning = false
            }
        }

        this._ioService.close()
    }
}

