import {IModel} from "../models/model.interface"
import {IView} from "../views/view.interface"
import {IState} from "./state.interface"
import {IStateMachine} from "./state-machine.interface"
import {BattleStartState} from "./battle-start.state"
import {InputState} from "./input.state"

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
        if (battle.enemy) {
            this.stateMachine.enter(BattleStartState)
            return
        }

        const location = this.model.getCurrentLocation()
        this.view.displayLocation(location)
        this.stateMachine.enter(InputState)
    }

    exit(): void {}

}