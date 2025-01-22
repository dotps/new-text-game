import {IModel} from "../Models/IModel"
import {IStateMachine} from "./IStateMachine"
import {LocationState} from "./LocationState"

export class BattleEndState implements IState {
    private stateMachine: IStateMachine
    private model: IModel

    constructor(stateMachine: IStateMachine, model: IModel) {
        this.stateMachine = stateMachine
        this.model = model
    }
    
    enter(): void {
        const battle = this.model.getBattle()
        battle.clearEnemy()
        const locationId = this.model.getAfterBattleLocationId()
        this.model.setCurrentLocation(locationId)
        this.stateMachine.enter(LocationState)
    }

    exit(): void {}
}