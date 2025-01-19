import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {LocationState} from "./LocationState"
import {Action, IAction, IActionParams, LocationParams} from "../Data/GameData"
import {Commands} from "../Commands/Commands"
import {InputState} from "./InputState"
import {InputBattleState} from "./InputBattleState"
import {Locations} from "../Data/Locations"
import {Thing} from "../Models/Things/Thing"
import {IThingParams} from "../Models/Things/IThingParams"

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

        // TODO: рефакторинг !!!

        const enemy = this.model.getCurrentEnemy()
        if (!enemy) {
            this.view.displayText(`Вы ринулись в бой, но противника уже след простыл.`)
            const nextLocation = this.model.getLocationParams(this.model.getAfterBattleLocationId())
            this.model.setCurrentLocation(nextLocation)
            this.stateMachine.enter(LocationState)
            return
        }

        const things = this.model.inventory.getAll()
        const actions: IAction[] = []

        for (const thing of things) {
            const thingParams = {
                thingId: thing.id,
            }
            const action = new Action(Commands.USE_THING_COMMAND, `Использовать - ${thing.title}`, "", thing.damageText, thingParams)
            actions.push(action)
        }

        actions.push(new Action(Commands.GAME_OVER_COMMAND, `Убежать`, "", "Вы решили бежать от оппонента, но он вас догнал.", {}))
        actions.push(new Action(Commands.GAME_OVER_COMMAND, `Спрятаться`, "", "Вы решили спрятаться от оппонента, но он вас нашел.", {}))

        // TODO: что-то с локациями намудрил, нужно локациями оперировать, а не их параметрами, изменения затронут LocationState
        const battleLocationParams = this.model.getLocationParams(Locations.BATTLE)
        this.model.setCurrentLocation(battleLocationParams)
        const battleLocation = this.model.getCurrentLocation()
        battleLocation.setActions(actions)
        battleLocation.description = `Перед вами: ${enemy.title}`

        this.view.displayLocation(battleLocation)
        this.stateMachine.enter(BattlePlayerTurnState)
    }

    exit(): void {}

}