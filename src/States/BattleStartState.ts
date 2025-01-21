import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {LocationState} from "./LocationState"
import {Commands} from "../Commands/Commands"
import {Locations} from "../Locations/Locations"
import {Action} from "../Actions/Action"
import {IAction} from "../Actions/IAction"

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

        this.model.setCurrentLocation(Locations.BATTLE)
        const battleLocation = this.model.getCurrentLocation()
        const actions = this.createBattleActions()
        battleLocation.setActions(actions)
        battleLocation.description = `Перед вами: ${enemy.title}`

        this.view.displayLocation(battleLocation)
        this.stateMachine.enter(BattlePlayerTurnState)
    }

    exit(): void {}

    private getEnemy() {
        const enemy = this.model.getCurrentEnemy()
        if (!enemy) {
            this.view.displayText(`Вы ринулись в бой, но противника уже след простыл.`)
            const nextLocation = this.model.getAfterBattleLocationId()
            this.model.setCurrentLocation(nextLocation)
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
            const action = new Action(Commands.USE_THING_COMMAND, `Использовать - ${thing.title}`, "", thing.damageText, thingParams)
            actions.push(action)
        }

        actions.push(new Action(Commands.GAME_OVER_COMMAND, `Убежать`, "", "Вы решили бежать от оппонента, но он вас догнал.", {}))
        actions.push(new Action(Commands.GAME_OVER_COMMAND, `Спрятаться`, "", "Вы решили спрятаться от оппонента, но он вас нашел.", {}))

        return actions
    }
}