import {IStateMachine} from "./state-machine.interface"
import {InputBaseState} from "./input-base.state"
import {IState} from "./state.interface"
import {IModel} from "../models/model.interface"
import {IInputOutputService} from "../services/input-output.interface"
import {InputHandlerBattleState} from "./input-handler-battle.state"

export class InputBattleState implements IState {

    private inputBaseState: IState

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService) {
        this.inputBaseState = new InputBaseState(stateMachine, model, inputOutputService, InputBattleState, InputHandlerBattleState)
    }

    enter(): void {
        this.inputBaseState.enter()
    }

    exit(): void {
        this.inputBaseState.exit()
    }
}