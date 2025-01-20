import {IModel} from "../Models/IModel"
import {IInputOutputService} from "../Services/IInputOutputService"
import {IStateMachine} from "./IStateMachine"
import {InputHandlerBattleState} from "./InputHandlerBattleState"

export class InputBattleState implements IState {

    private stateMachine: IStateMachine
    private model: IModel
    private inputOutputService: IInputOutputService

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOutputService) {
        this.stateMachine = stateMachine
        this.model = model
        this.inputOutputService = inputOutputService;
    }

    async enter(): Promise<void> {
        const responseData = await this.inputOutputService.getInput("> ")

        if (responseData) {
            this.model.currentInput = responseData.inputData ? responseData.inputData.toUpperCase().trim() : ""
            this.stateMachine.enter(InputHandlerBattleState)
        }
        else {
            this.stateMachine.enter(InputBattleState)
        }
    }

    exit(): void {}
}