import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {InputOutputService} from "../Services/InputOutputService";
import {InputHandlerState} from "./InputHandlerState";
import {Logger} from "../Utils/Logger"
import {IInputOuotputService} from "../Services/IInputOuotputService"

export class InputState implements IState {

    private stateMachine: StateMachine
    private model: IModel
    private inputOutputService: IInputOuotputService

    constructor(stateMachine: StateMachine, model: IModel, inputOutputService: IInputOuotputService) {
        this.stateMachine = stateMachine
        this.model = model
        this.inputOutputService = inputOutputService;
    }

    async enter(): Promise<void> {
        Logger.log("enter " + this.constructor.name)

        const responseData = await this.inputOutputService.getInput("> ")
        Logger.log(responseData)

        if (responseData) {
            this.model.currentInput = responseData.inputData ? responseData.inputData.toLowerCase().trim() : ""
            this.stateMachine.enter(InputHandlerState)
        }
        else {
            this.stateMachine.enter(InputState)
        }
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }
}