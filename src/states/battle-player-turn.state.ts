import {IStateMachine} from "./state-machine.interface"
import {IModel} from "../models/model.interface"
import {IState} from "./state.interface"
import {GameOverState} from "./game-over.state"
import {InputBattleState} from "./input-battle.state"

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