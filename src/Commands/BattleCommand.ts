import {IAction} from "../Data/GameData"
import {IStateMachine} from "../States/IStateMachine"
import {IModel} from "../Models/IModel"
import {Logger} from "../Utils/Logger"
import {BattleStartState} from "../States/BattleStartState"

export class BattleCommand implements ICommand {

    private readonly action: IAction
    private readonly stateMachine: IStateMachine
    private readonly model: IModel

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine) {
        this.model = model
        this.action = action
        this.stateMachine = stateMachine
    }

    execute(): void {
        Logger.log(this.constructor.name)

        const enemyId = this.action?.params?.enemyId?.toString()
        this.model.setCurrentEnemy(enemyId)
        this.stateMachine.enter(BattleStartState)
    }

}