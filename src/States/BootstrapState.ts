import {StateMachine} from "./StateMachine"
import {LoadProgressState} from "./LoadProgressState"

export class BootstrapState implements IState {

    private _stateMachine: StateMachine

    constructor(stateMachine: StateMachine) {
        this._stateMachine = stateMachine
        this.initServices();
    }

    private initServices() {
        // TODO: инициализировать все зависимости и сервисы
    }

    public enter(): void {
        console.log("enter " + this.constructor.name)
        // this._stateMachine.enter(LoadProgressState)
    }

    public exit(): void {
        console.log("exit " +  + this.constructor.name)
    }
}