import {StateMachine} from "./StateMachine"
import {IModel} from "../IModel"

export class LoadProgressState implements IState {

    private _stateMachine: StateMachine

    // constructor(stateMachine: StateMachine, model: IModel, saveLoadService: ISaveLoadService) {
    constructor(stateMachine: StateMachine) {
        this._stateMachine = stateMachine
    }

    enter(): void {
        // this._stateMachine.enter(LoadProgressState)
        console.log("enter " + this.constructor.name)
    }
    exit(): void {
        console.log("exit " + this.constructor.name)
    }

}