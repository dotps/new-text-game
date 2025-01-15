import {BattleCommand, ExitGameCommand, NextLocationCommand, TakeThingCommand} from "./Commands"
import {IModel} from "../Models/IModel"
import {IAction} from "../Data/GameData"
import {IStateMachine} from "../States/IStateMachine"
import {IView} from "../Views/IView"

export class CommandFactory {
    static createCommand(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView): ICommand | null {
        switch (action.command) {
            case "EXIT_GAME_COMMAND":
                return new ExitGameCommand(model)
            case "NEXT_LOCATION_COMMAND":
                return new NextLocationCommand(action, model, stateMachine)
            case "TAKE_THING_COMMAND":
                // return new TakeThingCommand(action, model.inventory, stateMachine)
                return new TakeThingCommand(action, model, stateMachine, view)
            case "BATTLE_COMMAND":
                return new BattleCommand(action, model, stateMachine, view)
            default:
                return null
        }
    }
}