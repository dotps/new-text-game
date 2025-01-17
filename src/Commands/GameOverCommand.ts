import {IStateMachine} from "../States/IStateMachine"
import {GameOverState} from "../States/GameOverState"
import {IModel} from "../Models/IModel"
import {IAction, Location} from "../Data/GameData"
import {Locations} from "../Data/Locations"
import {LocationState} from "../States/LocationState"
import {IView} from "../Views/IView"

export class GameOverCommand implements ICommand {

    private stateMachine: IStateMachine
    private view: IView
    private action: IAction
    private model: IModel

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        this.view = view
        this.action = action
        this.model = model
        this.stateMachine = stateMachine
    }

    execute() {
        this.model.gameOver()
        let locationParams = this.model.getLocationParams(Locations.GAME_OVER)
        this.model.setCurrentLocation(locationParams)
        this.view.displayText(this.action?.messageAfterExecute)
        this.stateMachine.enter(LocationState)
    }

}