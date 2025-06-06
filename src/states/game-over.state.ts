import {IStateMachine} from "./state-machine.interface"
import {IModel} from "../models/model.interface"
import {IState} from "./state.interface"
import {IView} from "../views/view.interface"
import {Locations} from "../locations/locations"
import {LocationState} from "./location.state"
import {ExitState} from "./exit.state"

export class GameOverState implements IState {
    private view: IView
    private stateMachine: IStateMachine
    private model: IModel

    constructor(stateMachine: IStateMachine, view: IView, model: IModel) {
        this.model = model
        this.stateMachine = stateMachine
        this.view = view
    }
    
    enter(): void {
        this.model.setBattle(null)
        this.model.setCurrentLocation(Locations.GAME_OVER)
        this.stateMachine.enter(LocationState)
        this.stateMachine.enter(ExitState)
    }

    exit(): void {}
}