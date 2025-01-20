import {IModel} from "../Models/IModel"
import {IInputOutputService} from "../Services/IInputOutputService"
import {IStateMachine} from "./IStateMachine"

export class InputBaseState implements IState {

    private readonly stateMachine: IStateMachine
    private readonly model: IModel
    private readonly inputOutputService: IInputOutputService
    private readonly inputState: new (...args: any[]) => IState
    private readonly inputHandlerState: new (...args: any[]) => IState

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService, inputState: new (...args: any[]) => IState, inputHandlerState: new (...args: any[]) => IState) {
        this.stateMachine = stateMachine
        this.model = model
        this.inputOutputService = inputOutputService
        this.inputState = inputState
        this.inputHandlerState = inputHandlerState
    }

    async enter(): Promise<void> {

        const responseData = await this.inputOutputService.getInput("> ")

        if (responseData) {
            this.model.currentInput = responseData.inputData ? responseData.inputData.toUpperCase().trim() : ""
            this.stateMachine.enter(this.inputHandlerState)
        }
        else {
            this.stateMachine.enter(this.inputState)
        }
    }

    exit(): void {}
}