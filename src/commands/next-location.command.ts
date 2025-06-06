import {ICommand} from "./command.interface"
import {IAction} from "../actions/action.interface"
import {IModel} from "../models/model.interface"
import {IStateMachine} from "../states/state-machine.interface"
import {IView} from "../views/view.interface"
import {LocationParams} from "../data/location-params"
import {LocationState} from "../states/location.state"

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