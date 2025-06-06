import {ICommand} from "./command.interface"
import {IAction} from "../actions/action.interface"
import {IStateMachine} from "../states/state-machine.interface"
import {IView} from "../views/view.interface"
import {IModel} from "../models/model.interface"
import {LocationState} from "../states/location.state"
import {ExitState} from "../states/exit.state"
import {Locations} from "../locations/locations"

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