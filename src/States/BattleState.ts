import {InputState} from "./InputState"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {GameOverState} from "./GameOverState"
import {ILocation} from "../Data/GameData"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {LocationState} from "./LocationState"

export class BattleState implements IState {
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

        const enemy = this.model.getCurrentEnemy()
        if (!enemy) {
            this.view.displayText(`Вы ринулись в бой, но противника уже след простыл.`)
            this.stateMachine.enter(LocationState) // TODO: заглушка, реализовать переход к следующей локации
            return
        }
        this.view.displayEnemy(enemy)

        /*
        TODO: тут продолжить
        const actions =
        this.view.displayActions()
*/
        // if (this.model.isGameOver()) {
        //     this.stateMachine.enter(GameOverState)
        //     return
        // }

        // const enemy = this.model.getCurrentEnemy()
        // enemy.takeDamage(10)
        // this.view.displayEnemyInfo(enemy)

        // TODO: реализовать бой
        // TODO: в BattleState если enemy = null, то писать что враг убежал и продолжать игру
        // TODO: при выходе из BattleState enemy в модели должен удалятся

        this.stateMachine.enter(BattlePlayerTurnState)
        // this.stateMachine.enter(InputState)
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
        // this.model.clearEnemy()
    }

}