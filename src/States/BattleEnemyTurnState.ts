import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {InputBattleState} from "./InputBattleState"

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
        Logger.log("enter " + this.constructor.name)

        const battleLocation = this.model.getCurrentLocation()
        const player = this.model.getPlayer()
        const enemy = this.model.getCurrentEnemy()
        if (enemy) {
            const damageEffectMessage = player.takeDamage(enemy)
            this.view.displayText(damageEffectMessage)
        }

            //this.view.displayLocation(battleLocation)
        this.stateMachine.enter(InputBattleState)
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }

}