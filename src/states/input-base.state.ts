import {IModel} from "../models/model.interface"
import {StateClassType} from "./state-machine"
import {IInputOutputService} from "../services/input-output.interface"
import {IState} from "./state.interface"
import {IStateMachine} from "./state-machine.interface"
import {IInput} from "../models/input.interface"


export class InputBaseState implements IState {

    private readonly stateMachine: IStateMachine
    private readonly model: IModel
    private readonly inputOutputService: IInputOutputService
    private readonly inputState: StateClassType
    private readonly inputHandlerState: StateClassType
    private inputCursor = "> "
    private input: IInput

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService, inputState: StateClassType, inputHandlerState: StateClassType) {
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
            this.input.value = inputValue
            this.stateMachine.enter(this.inputHandlerState)
        }
        else {
            this.stateMachine.enter(this.inputState)
        }
    }

    exit(): void {}
}