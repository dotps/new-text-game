import {IStateMachine} from "./state-machine.interface"
import {IState} from "./state.interface"
import {IModel} from "../models/model.interface"
import {LocationState} from "./location.state"
import {IAction} from "../actions/action.interface"
import {Action} from "../actions/action"
import {Commands} from "../commands/commands"

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
                action: new Action(Commands.NextLocationCommand, "", "", "", {locationId: nextLocationId, locationDescription: "Пора идти дальше."})
            }
            const action = new Action(Commands.TakeThingCommand, `Взять - ${thing.title}`, ``, `Вы взяли ${thing.title}`, thingParams)
            actions.push(action)
        }
        return actions
    }

    exit(): void {}
}