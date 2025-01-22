import {IModel} from "../Models/IModel"
import {IInputOutputService} from "../Services/IInputOutputService"
import {IStateMachine} from "./IStateMachine"
import {IInput} from "../Models/IInput"

export class InputBaseState implements IState {

    private readonly stateMachine: IStateMachine
    private readonly model: IModel
    private readonly inputOutputService: IInputOutputService
    private readonly inputState: new (...args: any[]) => IState
    private readonly inputHandlerState: new (...args: any[]) => IState
    private inputCursor = "> "
    private input: IInput

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService, inputState: new (...args: any[]) => IState, inputHandlerState: new (...args: any[]) => IState) {
        this.stateMachine = stateMachine
        this.model = model
        this.inputOutputService = inputOutputService
        this.inputState = inputState
        this.inputHandlerState = inputHandlerState
        this.input = this.model.getInput()
    }

    async enter(): Promise<void> {

        const inputData = await this.inputOutputService.getInput(this.inputCursor)

        if (inputData) {
            const inputValue = inputData.data ? inputData.data.toUpperCase().trim() : ""
            this.input.setValue(inputValue)
            this.stateMachine.enter(this.inputHandlerState)
        }
        else {
            this.stateMachine.enter(this.inputState)
        }
    }

    exit(): void {}
}