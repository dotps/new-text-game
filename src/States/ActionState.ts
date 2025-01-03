import {Logger} from "../Utils/Logger"

export class ActionState implements IState {
    enter(): void {
        Logger.log("enter " + this.constructor.name)
        // получить из модели данные
    }
    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }
}