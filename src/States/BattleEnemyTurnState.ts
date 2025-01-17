import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {InputBattleState} from "./InputBattleState"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {GameOverState} from "./GameOverState"
import {LocationState} from "./LocationState"
import {BattleEndState} from "./BattleEndState"

export class BattleEnemyTurnState implements IState {
    private stateMachine: IStateMachine
    private model: IModel
    private view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }
    
    enter(): void {
        const player = this.model.getPlayer()
        const enemy = this.model.getCurrentEnemy()

        if (!enemy || !enemy.isAlive()) {
            this.stateMachine.enter(BattleEndState)
            return
        }

        const damageEffectMessage = player.takeDamage(enemy)
        this.view.displayText(damageEffectMessage)
        this.stateMachine.enter(BattlePlayerTurnState)
    }

    exit(): void {}

}