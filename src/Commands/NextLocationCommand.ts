import {IAction, LocationParams} from "../Data/GameData"
import {IModel} from "../Models/IModel"
import {IStateMachine} from "../States/IStateMachine"
import {LocationState} from "../States/LocationState"

export class NextLocationCommand implements ICommand {

    private readonly action: IAction
    private readonly model: IModel
    private readonly stateMachine: IStateMachine

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine) {
        this.action = action
        this.model = model
        this.stateMachine = stateMachine
    }

    execute() {
        this.model.setLocation(new LocationParams(this.action?.params))
        this.stateMachine.enter(LocationState)
    }
}