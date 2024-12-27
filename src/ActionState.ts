export class ActionState implements IState {
    enter(): void {
        console.log("enter state ActionState")
        // получить из модели данные
    }
    exit(): void {
        console.log("exit state ActionState")
    }
}