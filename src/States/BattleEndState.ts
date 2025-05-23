import {IModel} from "../Models/IModel"
import {IStateMachine} from "./IStateMachine"
import {LocationState} from "./LocationState"
import {Action} from "../Actions/Action"
import {IAction} from "../Actions/IAction"
import {Commands} from "../Commands/Commands"
import {IState} from "./IState"

export class BattleEndState implements IState {
    private stateMachine: IStateMachine
    private model: IModel

    constructor(stateMachine: IStateMachine, model: IModel) {
        this.stateMachine = stateMachine
        this.model = model
    }
    
    enter(): void {
        const battle = this.model.getBattle()
        const enemy = battle.getEnemy()
        const locationId = battle.getAfterBattleLocationId()

        this.model.setBattle(null)
        this.model.setCurrentLocation(locationId)
        const location = this.model.getCurrentLocation()

        if (enemy?.lootIds) {
            const actions = this.createTakeLootActions(enemy.lootIds, locationId)
            location.addActions(actions)
        }
        this.stateMachine.enter(LocationState)
    }

    private createTakeLootActions(lootIds: string[], nextLocationId: string): IAction[] {
        if (!lootIds) return []

        const actions: IAction[] = []
        for (const lootId of lootIds) {
            const thing = this.model.gameData.getThing(lootId)
            if (!thing) continue
            const thingParams = {
                thingId: thing.id,
                action: new Action(Commands.NEXT_LOCATION_COMMAND, "", "", "", {locationId: nextLocationId, locationDescription: "Пора идти дальше."})
            }
            const action = new Action(Commands.TAKE_THING_COMMAND, `Взять - ${thing.title}`, ``, `Вы взяли ${thing.title}`, thingParams)
            actions.push(action)
        }
        return actions
    }

    exit(): void {}
}