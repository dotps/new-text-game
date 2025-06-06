import {Commands} from "../commands/commands"
import {IAction} from "../actions/action.interface"
import {IModel} from "../models/model.interface"
import {IStateMachine} from "../states/state-machine.interface"
import {IView} from "../views/view.interface"
import {ICommand} from "../commands/command.interface"
import {ExitGameCommand} from "../commands/exit-game.command"
import {GameOverCommand} from "../commands/game-over.command"
import {FinishCommand} from "../commands/finish.command"
import {NextLocationCommand} from "../commands/next-location.command"
import {TakeThingCommand} from "../commands/take-thing.command"
import {BattleCommand} from "../commands/battle-command"
import {UseThingCommand} from "../commands/use-thing.command"

export class CommandFactory {
    static createCommand(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView): ICommand | null {
        switch (action.command) {
            case Commands.ExitGameCommand:
                return new ExitGameCommand(stateMachine)
            case Commands.GameOverCommand:
                return new GameOverCommand(action, model, stateMachine, view)
            case Commands.FinishCommand:
                return new FinishCommand(action, model, stateMachine, view)
            case Commands.NextLocationCommand:
                return new NextLocationCommand(action, model, stateMachine, view)
            case Commands.TakeThingCommand:
                return new TakeThingCommand(action, model, stateMachine, view)
            case Commands.BattleCommand:
                return new BattleCommand(action, model, stateMachine)
            case Commands.UseThingCommand:
                return new UseThingCommand(action, model, stateMachine, view)
            default:
                return null
        }
    }
}