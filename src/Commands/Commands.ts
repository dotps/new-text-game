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
        // const params = this.action?.params
        // const locationId = this.action?.params?.locationId?.toString()
        // const isDisableDescription = this.action?.params?.isDisableDescription === true
        // const locationDescription = this.action?.params?.description.toString()
        // const isGameOver = this.action?.params?.isGameOver === true
        // const params = new LocationParams(locationId, isDisableDescription, isGameOver)
        const locationParams = new LocationParams(this.action?.params)

        // const stateParams = this.action?.stateParams
        // const nextLocationId = params?.locationId || null
        // const isGameOver = params?.isGameOver ? true : false

        // if (!nextLocationId) {
        if (!locationParams.locationId) {
            throw new Error(`${this.constructor.name} required action params not found!`)
        }

        // if (isGameOver) this.model.gameOver()

        this.model.setLocation(locationParams)
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

