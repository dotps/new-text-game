import {ICommand} from "./command.interface"
import {IAction} from "../actions/action.interface"
import {IStateMachine} from "../states/state-machine.interface"
import {IModel} from "../models/model.interface"
import {BattleStartState} from "../states/battle-start.state"
import {Battle} from "../battle/battle"

export class BattleCommand implements ICommand {

    private readonly action: IAction
    private readonly stateMachine: IStateMachine
    private readonly model: IModel

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine) {
        this.model = model
        this.action = action
        this.stateMachine = stateMachine
    }

    execute(): void {
        const enemyId = this.action?.params?.enemyId?.toString() || ""
        const enemy = this.model.gameData.getEnemy(enemyId)
        const afterBattleLocationId = this.action?.params?.afterBattleLocationId?.toString() || ""

        const battle = new Battle(enemy, afterBattleLocationId)
        this.model.setBattle(battle)

        this.stateMachine.enter(BattleStartState)
    }

}