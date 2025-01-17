import {InputState} from "./InputState"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {GameOverState} from "./GameOverState"
import {ILocation} from "../Data/GameData"

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
        const location = this.model.getCurrentLocation()
        this.view.displayLocation(location)

        if (this.model.isGameOver()) {
            this.stateMachine.enter(GameOverState)
            return
        }

        this.stateMachine.enter(InputState)
    }

    exit(): void {}

}