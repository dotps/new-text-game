import {InputHandler} from "./input-handler"
import {IStateMachine} from "./state-machine.interface"
import {IState} from "./state.interface"
import {IModel} from "../models/model.interface"
import {IView} from "../views/view.interface"
import {InputState} from "./input.state"

export class InputHandlerState implements IState {

    private readonly stateMachine: IStateMachine
    private inputHandler: InputHandler

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.inputHandler = new InputHandler(stateMachine, model, view, () => this.handleNumberInput())
    }

    enter(): void {
        this.inputHandler.enter()
    }

    private handleNumberInput(): void {
        const command = this.inputHandler.createCommandFromInputData()

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