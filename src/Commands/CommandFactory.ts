import {ExitGameCommand, NextLocationCommand} from "./Commands"
import {IModel} from "../Models/IModel"
import {IAction} from "../Data/GameData"
import {IStateMachine} from "../States/IStateMachine"

export class CommandFactory {
    static createCommand(action: IAction, model: IModel, stateMachine: IStateMachine): ICommand | null {
        switch (action.command) {
            case "EXIT_GAME_COMMAND":
                return new ExitGameCommand(model)
            case "NEXT_LOCATION_COMMAND":
                return new NextLocationCommand(action, model, stateMachine)
            default:
                return null
        }
    }
    /*
    static createCommand(command: string, model: IModel): ICommand | null {
        switch (command) {
            case "EXIT_GAME_COMMAND":
                return new ExitGameCommand(model)
            case "NEXT_LOCATION_COMMAND":
                return new NextLocationCommand(model)
            default:
                return null
        }
    }
     */
}