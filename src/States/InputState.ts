import {IModel} from "../Models/IModel"
import {InputHandlerState} from "./InputHandlerState";
import {Logger} from "../Utils/Logger"
import {IInputOuotputService} from "../Services/IInputOuotputService"
import {IStateMachine} from "./IStateMachine"

export class InputState implements IState {

    private stateMachine: IStateMachine
    private model: IModel
    private inputOutputService: IInputOuotputService

    constructor(stateMachine: IStateMachine, model: IModel, inputOutputService: IInputOuotputService) {
        this.stateMachine = stateMachine
        this.model = model
        this.inputOutputService = inputOutputService;
    }

    async enter(nextStateType?: new (...args: any[]) => IState): Promise<void> {

        const responseData = await this.inputOutputService.getInput("> ")

        if (responseData) {
            this.model.currentInput = responseData.inputData ? responseData.inputData.toLowerCase().trim() : ""
            const nextState = nextStateType ?? InputHandlerState
            this.stateMachine.enter(nextState)
        }
        else {
            this.stateMachine.enter(InputState, nextStateType)
        }
    }

    exit(): void {}
}