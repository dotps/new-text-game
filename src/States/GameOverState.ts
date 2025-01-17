import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {ExitState} from "./ExitState"

export class GameOverState implements IState {
    private view: IView
    private stateMachine: IStateMachine
    private readonly gameOverText: string = "Конец игры"

    constructor(stateMachine: IStateMachine, view: IView) {
        this.stateMachine = stateMachine
        this.view = view
    }
    
    enter(): void {
        this.view.displayText(this.gameOverText)
        this.stateMachine.enter(ExitState)
    }

    exit(): void {}
}