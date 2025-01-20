import {IModel} from "../Models/IModel"
import {IStateMachine} from "./IStateMachine"
import {InputBattleState} from "./InputBattleState"
import {GameOverState} from "./GameOverState"

export class BattlePlayerTurnState implements IState {
    private stateMachine: IStateMachine
    private model: IModel

    constructor(stateMachine: IStateMachine, model: IModel) {
        this.model = model
        this.stateMachine = stateMachine
    }
    
    enter(): void {
        if (this.model.isGameOver()) {
            this.stateMachine.enter(GameOverState)
            return
        }
        this.stateMachine.enter(InputBattleState)
    }

    exit(): void {}

}