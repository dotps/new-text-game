import {IModel} from "../Models/IModel"
import {IAction} from "../Data/GameData"
import {LocationState} from "../States/LocationState"
import {StateMachine} from "../States/StateMachine"
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
        const params = this.action?.params;
        const nextLocationId = params?.nextLocationId || null

        if (!nextLocationId) {
            throw new Error(`${this.constructor.name} command param nextLocationId not found!`)
        }

        this.model.setLocation(nextLocationId)
        this.stateMachine.enter(LocationState)
    }
}

export class ExitGameCommand implements ICommand {
    private model: IModel

    constructor(model: IModel) {
        this.model = model
    }

    execute() {
        //this._model.setLocation("village")
    }

}

export enum commands {
    EXIT_COMMAND = "exit"
}

