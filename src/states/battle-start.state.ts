import {IStateMachine} from "./state-machine.interface"
import {IModel} from "../models/model.interface"
import {IState} from "./state.interface"
import {IView} from "../views/view.interface"
import {Locations} from "../locations/locations"
import {BattlePlayerTurnState} from "./battle-player-turn.state"
import {LocationState} from "./location.state"
import {IAction} from "../actions/action.interface"
import {Action} from "../actions/action"
import {Commands} from "../commands/commands"

export class BattleStartState implements IState {
    private stateMachine: IStateMachine
    private model: IModel
    private view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }
    
    enter(): void {

        const enemy = this.getEnemy()
        if (!enemy) return

        this.model.setCurrentLocation(Locations.Battle)
        const battleLocation = this.model.getCurrentLocation()
        const actions = this.createBattleActions()
        battleLocation.setActions(actions)
        battleLocation.description = `Перед вами: ${enemy.title}`

        this.view.displayLocation(battleLocation)
        this.stateMachine.enter(BattlePlayerTurnState)
    }

    exit(): void {}

    private getEnemy() {
        const battle = this.model.getBattle()
        const enemy = battle.getEnemy()
        if (!enemy) {
            this.view.displayText(`Вы ринулись в бой, но противника уже след простыл.`)
            const nextLocationId = battle.getAfterBattleLocationId()
            this.model.setCurrentLocation(nextLocationId)
            this.stateMachine.enter(LocationState)
        }
        return enemy
    }

    private createBattleActions(): IAction[] {
        const actions: IAction[] = []
        const inventory = this.model.getInventory()
        const things = inventory.getAll()

        for (const thing of things) {
            const thingParams = {
                thingId: thing.id,
            }
            const action = new Action(Commands.UseThingCommand, `Использовать - ${thing.title}`, "", thing.damageText, thingParams)
            actions.push(action)
        }

        actions.push(new Action(Commands.GameOverCommand, `Убежать`, "", "Вы решили бежать от оппонента, но он вас догнал.", {}))
        actions.push(new Action(Commands.GameOverCommand, `Спрятаться`, "", "Вы решили спрятаться от оппонента, но он вас нашел.", {}))

        return actions
    }
}