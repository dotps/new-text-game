import {IStateMachine} from "../States/IStateMachine"
import {IModel} from "../Models/IModel"
import {BattleStartState} from "../States/BattleStartState"
import {IAction} from "../Actions/IAction"

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

        // TODO: по идее формировать бой нужно здесь
        // battle = this.model.getBattle()
        // battle = new Battle() + параметры


        const enemyId = this.action?.params?.enemyId?.toString() || ""

        const enemy = this.model.gameData.getEnemy(enemyId)
        const battle = this.model.getBattle()
        battle.setEnemy(enemy)

        const afterBattleLocationId = this.action?.params?.afterBattleLocationId?.toString() || ""
        this.model.setAfterBattleLocationId(afterBattleLocationId)

        this.stateMachine.enter(BattleStartState)
    }

}