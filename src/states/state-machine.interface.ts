import {IState} from "./state.interface"
import {StateClassType} from "./state-machine"

export interface IStateMachine {
    enter<TState extends IState>(stateType: StateClassType<TState>): void
}