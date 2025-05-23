import {IModel} from "../Models/IModel"
import {IInputOutputService} from "../Services/IInputOutputService"
import {IStateMachine} from "./IStateMachine"
import {InputHandlerBattleState} from "./InputHandlerBattleState"
import {InputBaseState} from "./InputBaseState"
import {IState} from "./IState"

export class InputBattleState implements IState {

    private inputBaseState: IState

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService) {
        this.inputBaseState = new InputBaseState(stateMachine, model, inputOutputService, InputBattleState, InputHandlerBattleState)
    }

    enter(): void {
        this.inputBaseState.enter()
    }

    exit(): void {
        this.inputBaseState.exit()
    }
}