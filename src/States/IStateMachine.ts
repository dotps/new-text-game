export interface IStateMachine {
    enter(stateType: new (...args: any[]) => IState): void
}