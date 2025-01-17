import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {LocationState} from "./LocationState"

export class BattleEndState implements IState {
    private stateMachine: IStateMachine
    private model: IModel
    private view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }
    
    enter(): void {
        // TODO: реализовать удаление врага из модели и переход к следующей локации
        this.model.clearEnemy()
        const locationId = this.model.getPreviousLocationId()
        const locationParams = this.model.getLocationParams(locationId)
        this.model.setCurrentLocation(locationParams)
        this.stateMachine.enter(LocationState)
    }

    exit(): void {}
}