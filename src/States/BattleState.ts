import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {LocationState} from "./LocationState"
import {Action, IAction, IActionParams, LocationParams} from "../Data/GameData"
import {Commands} from "../Commands/Commands"
import {InputState} from "./InputState"

export class BattleState implements IState {
    private stateMachine: IStateMachine
    private model: IModel
    private view: IView
    // private battleLocationId = "battle"

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

        // const battleLocation = this.model.getLocationParams(this.battleLocationId)
        // this.model.setCurrentLocation(battleLocation)
        console.log(this.model.getCurrentLocation())
        this.model.setBattleLocation()
        console.log(this.model.getCurrentLocation())

        this.view.displayEnemy(enemy)

        const things = this.model.inventory.getAll()

        let actions: IAction[] = []

        for (const thing of things) {
            const action = new Action("", `Использовать - ${thing.title}`, "", thing.damageText, {})
            actions.push(action)
        }

        const actionParams = {
            "locationId": "start", // TODO: нужно получать id следующей локации из модели
            "isGameOver": true
        }
        actions.push(new Action(Commands.NEXT_LOCATION_COMMAND, `Убежать`, "", "Вы решили бежать от противника.", actionParams))

        this.view.displayActions(actions)

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