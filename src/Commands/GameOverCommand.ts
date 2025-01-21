import {IStateMachine} from "../States/IStateMachine"
import {GameOverState} from "../States/GameOverState"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {IAction} from "../Actions/IAction"

export class GameOverCommand implements ICommand {

    private readonly stateMachine: IStateMachine
    private readonly view: IView
    private readonly action: IAction
    private readonly model: IModel

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        this.view = view
        this.action = action
        this.model = model
        this.stateMachine = stateMachine
    }

    execute() {
        this.view.displayText(this.action?.messageAfterExecute)
        this.stateMachine.enter(GameOverState)
    }

}