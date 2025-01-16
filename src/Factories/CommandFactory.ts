import {IModel} from "../Models/IModel"
import {IAction} from "../Data/GameData"
import {IStateMachine} from "../States/IStateMachine"
import {IView} from "../Views/IView"
import {NextLocationCommand} from "../Commands/NextLocationCommand"
import {ExitGameCommand} from "../Commands/ExitGameCommand"
import {TakeThingCommand} from "../Commands/TakeThingCommand"
import {BattleCommand} from "../Commands/BattleCommand"
import {Commands} from "../Commands/Commands"
import {UseThingCommand} from "../Commands/UseThingCommand"

export class CommandFactory {
    static createCommand(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView): ICommand | null {
        switch (action.command) {
            case Commands.EXIT_GAME_COMMAND:
                return new ExitGameCommand(stateMachine)
            case Commands.NEXT_LOCATION_COMMAND:
                return new NextLocationCommand(action, model, stateMachine)
            case Commands.TAKE_THING_COMMAND:
                // return new TakeThingCommand(action, model.inventory, stateMachine)
                return new TakeThingCommand(action, model, stateMachine, view)
            case Commands.BATTLE_COMMAND:
                return new BattleCommand(action, model, stateMachine)
            case Commands.USE_THING_COMMAND:
                return new UseThingCommand(action, model, stateMachine, view)
            default:
                return null
        }
    }
}