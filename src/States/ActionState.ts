export class ActionState implements IState {
    enter(): void {
        console.log("enter " + this.constructor.name)
        // получить из модели данные
    }
    exit(): void {
        console.log("exit " + this.constructor.name)
    }
}