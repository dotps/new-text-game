import {InputHandler} from "./input-handler"
import {IStateMachine} from "./state-machine.interface"
import {IState} from "./state.interface"
import {IModel} from "../models/model.interface"
import {IView} from "../views/view.interface"
import {BattleEnemyTurnState} from "./battle-enemy-turn.state"
import {InputBattleState} from "./input-battle.state"

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