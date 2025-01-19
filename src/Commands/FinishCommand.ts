import {IStateMachine} from "../States/IStateMachine"
import {GameOverState} from "../States/GameOverState"
import {IModel} from "../Models/IModel"
import {IAction, Location} from "../Data/GameData"
import {Locations} from "../Data/Locations"
import {LocationState} from "../States/LocationState"
import {IView} from "../Views/IView"
import {ExitState} from "../States/ExitState"
import {CommandFactory} from "../Factories/CommandFactory"
import {NextLocationCommand} from "./NextLocationCommand"

export class FinishCommand implements ICommand {

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
        let locationParams = this.model.getLocationParams(Locations.FINISH)
        this.model.setCurrentLocation(locationParams)
        this.view.displayText(this.action?.messageAfterExecute)
        this.stateMachine.enter(LocationState)
        this.stateMachine.enter(ExitState)
    }

}