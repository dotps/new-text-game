import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {InputBattleState} from "./InputBattleState"
import {BattleEnemyTurnState} from "./BattleEnemyTurnState"
import {InputHandler} from "./InputHandler"
import {IState} from "./IState"

export class InputHandlerBattleState implements IState {

    private readonly stateMachine: IStateMachine
    private inputHandler: InputHandler

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.inputHandler = new InputHandler(stateMachine, model, view, () => this.handleNumberInput())
    }

    enter(): void {
        this.inputHandler.enter()
    }

    private handleNumberInput() {

        const command = this.inputHandler.createCommandFromInputData()

        if (command) {
            command.execute()
            this.stateMachine.enter(BattleEnemyTurnState)
        }
        else {
            this.stateMachine.enter(InputBattleState)
        }
    }

    exit(): void {
        this.inputHandler.exit()
    }
}