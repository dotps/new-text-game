export class LoadLevelState implements IState {
    enter(): void {
        console.log("enter " + this.constructor.name)
    }

    exit(): void {
        console.log("exit " + this.constructor.name)
    }
}