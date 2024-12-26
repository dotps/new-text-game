export class ActionState implements IState {
    enter(): void {
        console.log("enter state ActionState")
    }
    exit(): void {
        console.log("exit state ActionState")
    }
}