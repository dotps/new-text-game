import {InputState} from "./InputState"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {GameOverState} from "./GameOverState"
import {ILocation} from "../Data/GameData"
import {InputBattleState} from "./InputBattleState"
import {InputHandlerBattleState} from "./InputHandlerBattleState"

export class BattlePlayerTurnState implements IState {
    private stateMachine: IStateMachine
    private model: IModel
    private view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }
    
    enter(): void {
        Logger.log("enter " + this.constructor.name)

        this.stateMachine.enter(InputState, InputHandlerBattleState)
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
        // this.model.clearEnemy()
    }

}