import {IModel} from "../Models/IModel"
import {InputHandlerState} from "./InputHandlerState"
import {IInputOutputService} from "../Services/IInputOutputService"
import {IStateMachine} from "./IStateMachine"
import {InputBaseState} from "./InputBaseState"

export class InputState implements IState {

    private inputBaseState: IState

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService) {
        this.inputBaseState = new InputBaseState(stateMachine, model, inputOutputService, InputState, InputHandlerState)
    }

    async enter(): Promise<void> {
        this.inputBaseState.enter()
    }

    exit(): void {
        this.inputBaseState.exit()
    }
}