import {IStateMachine} from "../States/IStateMachine"
import {GameOverState} from "../States/GameOverState"

export class ExitGameCommand implements ICommand {

    private stateMachine: IStateMachine

    constructor(stateMachine: IStateMachine) {
        this.stateMachine = stateMachine
    }

    execute() {
        this.stateMachine.enter(GameOverState)
    }

}