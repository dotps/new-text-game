import {IStateMachine} from "../States/IStateMachine"
import {IModel} from "../Models/IModel"
import {BattleStartState} from "../States/BattleStartState"
import {IAction} from "../Data/IAction"

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
        const enemyId = this.action?.params?.enemyId?.toString() || ""
        const afterBattleLocationId = this.action?.params?.afterBattleLocationId?.toString() || ""
        this.model.setAfterBattleLocationId(afterBattleLocationId)
        this.model.setCurrentEnemy(enemyId)
        this.stateMachine.enter(BattleStartState)
    }

}