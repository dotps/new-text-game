import {InputState} from "./InputState"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {BattleStartState} from "./BattleStartState"
import {IState} from "./IState"

export class LocationState implements IState {
    private stateMachine: IStateMachine
    private model: IModel
    private view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }
    
    enter(): void {

        const battle = this.model.getBattle()
        if (battle.getEnemy()) {
            this.stateMachine.enter(BattleStartState)
            return
        }

        const location = this.model.getCurrentLocation()
        this.view.displayLocation(location)
        this.stateMachine.enter(InputState)
    }

    exit(): void {}

}