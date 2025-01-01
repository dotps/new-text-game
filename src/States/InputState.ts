import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {IOService} from "../Services/IOService";
import {ExitState} from "./ExitState";

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
        console.log("enter " + this.constructor.name)
        // this._model.progress = this._saveLoadService.loadProgress()

        const responseData = await this._inputOutputService.getInput("You answer > ")
        console.log(responseData)

        if (responseData) {
            switch (responseData.inputData?.toLowerCase()) {
                case "exit":
                    this._stateMachine.enter(ExitState)
                    break
                default:
                    this._stateMachine.enter(InputState) // TODO: временно зациклил на ввод
            }
            //this._stateMachine.enter()
        }
            // this._view.update(responseData)
            // if (responseData.inputData?.toLowerCase() === 'exit') {
            //     this._isRunning = false
            // }

    }

    exit(): void {
        console.log("exit " + this.constructor.name)
    }
}