import {ICommand} from "./command.interface"
import {IStateMachine} from "../states/state-machine.interface"
import {GameOverState} from "../states/game-over.state"

export class ExitGameCommand implements ICommand {

    private readonly stateMachine: IStateMachine

    constructor(stateMachine: IStateMachine) {
        this.stateMachine = stateMachine
    }

    execute() {
        this.stateMachine.enter(GameOverState)
    }

}