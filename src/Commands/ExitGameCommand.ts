import {IStateMachine} from "../States/IStateMachine"
import {GameOverState} from "../States/GameOverState"
import {ICommand} from "./ICommand"

export class ExitGameCommand implements ICommand {

    private readonly stateMachine: IStateMachine

    constructor(stateMachine: IStateMachine) {
        this.stateMachine = stateMachine
    }

    execute() {
        this.stateMachine.enter(GameOverState)
    }

}