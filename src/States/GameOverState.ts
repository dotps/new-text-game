import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {ExitState} from "./ExitState"
import {Locations} from "../Locations/Locations"
import {LocationState} from "./LocationState"
import {IModel} from "../Models/IModel"

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