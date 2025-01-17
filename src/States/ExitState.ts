export class ExitState implements IState {
    enter(): void {
        process.exit(0)
    }

    exit(): void {}
}