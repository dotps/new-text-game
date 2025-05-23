import {IStateMachine} from "../States/IStateMachine"
import {IModel} from "../Models/IModel"
import {BattleStartState} from "../States/BattleStartState"
import {IAction} from "../Actions/IAction"
import {Battle} from "../Battle/Battle"
import {ICommand} from "./ICommand"

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