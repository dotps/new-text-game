import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {InputBattleState} from "./InputBattleState"
import {GameOverState} from "./GameOverState"

export class BattlePlayerTurnState implements IState {
    private stateMachine: IStateMachine

    constructor(stateMachine: IStateMachine) {
        this.stateMachine = stateMachine
    }
    
    enter(): void {
        this.stateMachine.enter(InputBattleState)
    }

    exit(): void {}

}