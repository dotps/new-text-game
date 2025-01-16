interface IState {
    enter(nextStateType?: new (...args: any[]) => IState): void
    exit(): void
}