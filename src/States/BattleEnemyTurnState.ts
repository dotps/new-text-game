import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {BattleEndState} from "./BattleEndState"

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
        const enemy = this.model.getCurrentEnemy()

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