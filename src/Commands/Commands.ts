import {IModel} from "../Models/IModel"
import {IAction, LocationParams} from "../Data/GameData"
import {LocationState} from "../States/LocationState"
import {IStateMachine} from "../States/IStateMachine"

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

export class ExitGameCommand implements ICommand {
    private model: IModel

    constructor(model: IModel) {
        this.model = model
    }

    execute() {

    }

}

export enum commands {
    EXIT_COMMAND = "exit"
}

