import {IState} from "./IState"

export interface IStateMachine {
    enter<TState extends IState>(stateType: new (...args: any[]) => TState): void
}