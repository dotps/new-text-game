import {IModel} from "./IModel";
import {ActionData} from "./ActionData"
import {StateMachine} from "./States/StateMachine"
import {StartGameState} from "./States/StartGameState"
import {ActionState} from "./States/ActionState"
import {BootstrapState} from "./States/BootstrapState"
import {GameProgressData} from "./States/SaveLoadService";

export class Model implements IModel {

    private _stateMachine = new StateMachine(this)
    public progress: GameProgressData = {}

    constructor() {
        this._stateMachine.enter(BootstrapState)
        // this._stateMachine.enter(StartGameState)
        // this._stateMachine.enter(ActionState)
    }

    getStartData(): ActionData {
        return {text: "Who are you?"}
    }
}