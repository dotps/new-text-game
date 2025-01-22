import {IModel} from "../Models/IModel"
import {IStateMachine} from "./IStateMachine"
import {LocationState} from "./LocationState"
import {Battle} from "../Battle/Battle"

export class BattleEndState implements IState {
    private stateMachine: IStateMachine
    private model: IModel

    constructor(stateMachine: IStateMachine, model: IModel) {
        this.stateMachine = stateMachine
        this.model = model
    }
    
    enter(): void {
        const battle = this.model.getBattle()
        const locationId = battle.getAfterBattleLocationId()
        this.model.setBattle(null)
        this.model.setCurrentLocation(locationId)
        this.stateMachine.enter(LocationState)
    }

    exit(): void {}
}