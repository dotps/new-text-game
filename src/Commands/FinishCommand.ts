import {IStateMachine} from "../States/IStateMachine"
import {IModel} from "../Models/IModel"
import {Locations} from "../Locations/Locations"
import {LocationState} from "../States/LocationState"
import {IView} from "../Views/IView"
import {ExitState} from "../States/ExitState"
import {IAction} from "../Actions/IAction"
import {ICommand} from "./ICommand"

export class FinishCommand implements ICommand {

    private readonly stateMachine: IStateMachine
    private readonly view: IView
    private readonly action: IAction
    private readonly model: IModel

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        this.view = view
        this.action = action
        this.model = model
        this.stateMachine = stateMachine
    }

    execute() {
        this.model.setCurrentLocation(Locations.FINISH)
        this.view.displayText(this.action?.messageAfterExecute)
        this.stateMachine.enter(LocationState)
        this.stateMachine.enter(ExitState)
    }

}