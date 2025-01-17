import {IModel} from "../Models/IModel"
import {InputHandlerState} from "./InputHandlerState";
import {Logger} from "../Utils/Logger"
import {IInputOuotputService} from "../Services/IInputOuotputService"
import {IStateMachine} from "./IStateMachine"
import {InputState} from "./InputState"
import {InputHandlerBattleState} from "./InputHandlerBattleState"

export class InputBattleState implements IState {

    private stateMachine: IStateMachine
    private model: IModel
    private inputOutputService: IInputOuotputService

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOuotputService) {
        this.stateMachine = stateMachine
        this.model = model
        this.inputOutputService = inputOutputService;
    }

    async enter(): Promise<void> {
        const responseData = await this.inputOutputService.getInput("> ")

        if (responseData) {
            this.model.currentInput = responseData.inputData ? responseData.inputData.toLowerCase().trim() : ""
            this.stateMachine.enter(InputHandlerBattleState)
        }
        else {
            this.stateMachine.enter(InputBattleState)
        }
    }

    exit(): void {}
}