import {IModel} from "../Models/IModel"
import {IStateMachine} from "../States/IStateMachine"
import {LocationState} from "../States/LocationState"
import {IView} from "../Views/IView"
import {LocationParams} from "../Data/LocationParams"
import {IAction} from "../Data/IAction"

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
        const locationId = this.action?.params?.locationId.toString() || ""
        const locationParams = new LocationParams(this.action?.params)
        this.model.setCurrentLocation(locationId, locationParams)
        this.stateMachine.enter(LocationState)
    }
}