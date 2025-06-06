import {IState} from "./state.interface"
import {IStateMachine} from "./state-machine.interface"
import {IModel} from "../models/model.interface"
import {IInputOutputService} from "../services/input-output.interface"
import {InputBaseState} from "./input-base.state"
import {InputHandlerState} from "./input-handler.state"

export class InputState implements IState {

    private inputBaseState: IState

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService) {
        this.inputBaseState = new InputBaseState(stateMachine, model, inputOutputService, InputState, InputHandlerState)
    }

    enter(): void {
        this.inputBaseState.enter()
    }

    exit(): void {
        this.inputBaseState.exit()
    }
}