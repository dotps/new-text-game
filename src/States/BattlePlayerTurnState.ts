import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {InputBattleState} from "./InputBattleState"
import {GameOverState} from "./GameOverState"

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

        if (this.model.isGameOver()) {
            this.stateMachine.enter(GameOverState)
            return
        }

        const battleLocation = this.model.getCurrentLocation()
        this.view.displayLocation(battleLocation)
        this.stateMachine.enter(InputBattleState)
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }

}