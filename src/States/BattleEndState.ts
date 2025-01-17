import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
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
        this.model.clearEnemy()
        const locationId = this.model.getAfterBattleLocationId()
        const locationParams = this.model.getLocationParams(locationId)
        this.model.setCurrentLocation(locationParams)
        this.stateMachine.enter(LocationState)
    }

    exit(): void {}
}