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
        // this._ioService.question(action.text + ' ', (inputData: string) => {
        //     const answer = {text: `Hello ${inputData}!`}
        //     this.write(answer)
        //     // this._ioService.close()
        // })
        const inputData: string = await this._ioService.question(action.text + ' ')
        // console.log(inputData)
        return {text: `Hello ${inputData}!`, inputData: inputData}
        // return new ActionData(`Hello ${inputData}!`, inputData)
        // TODO: передать в модель ответ
    }

    write(message: any): void {
        console.log(message.text)
    }

    public async run() {

        // Паолучить данные из model
        const startData = this._model.getStartData()
        // послать эти данные во view

        while (this._isRunning) {

            const action: ActionData = { text: "Who are you?" }
            // const action = new ActionData('Who are you? (Type "exit" to quit)')
            const response = await this.read(action)
            //
            console.log(response)
            //
            if (response.inputData?.toLowerCase() === 'exit') {
                this._isRunning = false
                // break
            }

            // this._view.getInput()
        //
        }

        this._ioService.close()
    }
}

