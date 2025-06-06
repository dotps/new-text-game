import {IStateMachine} from "./state-machine.interface"
import {IState} from "./state.interface"
import {IModel} from "../models/model.interface"
import {IView} from "../views/view.interface"
import {BattleEndState} from "./battle-end.state"
import {BattlePlayerTurnState} from "./battle-player-turn.state"

export class BattleEnemyTurnState implements IState {

    private stateMachine: IStateMachine
    private model: IModel
    private view: IView
    private readonly winMessage: string = "Вы победили."

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }

    enter(): void {
        const player = this.model.getPlayer()
        const battle = this.model.getBattle()
        const enemy = battle.getEnemy()

        const canFinishBattle = !enemy || !enemy.isAlive()
        if (canFinishBattle) {
            if (!enemy?.isAlive()) this.view.displayText(this.winMessage)
            this.stateMachine.enter(BattleEndState)
            return
        }

        const damageEffectMessage = player.takeDamage(enemy)
        this.view.displayText(damageEffectMessage)
        this.stateMachine.enter(BattlePlayerTurnState)
    }

    exit(): void {}

}