import {IModel} from "../Models/IModel"
import {InputState} from "./InputState"
import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {InputHandler} from "./InputHandler"

export class InputHandlerState implements IState {

    private readonly stateMachine: IStateMachine
    private inputHandler: InputHandler

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.inputHandler = new InputHandler(stateMachine, model, view)
    }

    async enter(): Promise<void> {
        await this.inputHandler.enter(() => this.handleNumberInput())
    }

    private handleNumberInput(): void {

        const command = this.inputHandler.getCommand()

        if (command) {
            command.execute()
        }
        else {
            this.stateMachine.enter(InputState)
        }
    }

    exit(): void {
        this.inputHandler.exit()
    }
}