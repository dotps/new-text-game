import {NextLocationCommand} from "../Commands/Commands"
import {IModel} from "../Models/IModel"

export class CommandFactory {
    static createCommand(command: string, model: IModel): ICommand | null {
        switch (command) {
            case "nextLocation":
                return new NextLocationCommand(model)
            default:
                return null
        }
    }
}