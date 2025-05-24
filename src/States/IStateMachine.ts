import {IState} from "./IState"
import {StateClassType} from "./StateMachine"

export interface IStateMachine {
    enter<TState extends IState>(stateType: StateClassType<TState>): void
}