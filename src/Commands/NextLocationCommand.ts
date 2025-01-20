import {IAction, LocationParams} from "../Data/GameData"
import {IModel} from "../Models/IModel"
import {IStateMachine} from "../States/IStateMachine"
import {LocationState} from "../States/LocationState"
import {IView} from "../Views/IView"

export class NextLocationCommand implements ICommand {

    private readonly action: IAction
    private readonly model: IModel
    private readonly stateMachine: IStateMachine
    private readonly view: IView

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        this.view = view
        this.action = action
        this.model = model
        this.stateMachine = stateMachine
    }

    execute() {
        this.view.displayText(this.action?.messageAfterExecute)
        this.model.setCurrentLocation(new LocationParams(this.action?.params))
        this.stateMachine.enter(LocationState)
    }
}