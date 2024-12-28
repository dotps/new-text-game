import {IModel} from "./IModel";
import {ActionData} from "./ActionData"
import {StateMachine} from "./States/StateMachine"
import {BootstrapState} from "./States/BootstrapState"
import {GameProgressData} from "./States/SaveLoadService";

export class Model implements IModel {

    private _stateMachine = new StateMachine(this)
    public progress: GameProgressData = {
        currentLocation: ""
    }
    // progress - состояние игры

    constructor() {
        this._stateMachine.enter(BootstrapState)
    }

    getStartData(): ActionData {
        return {text: "Who are you?"}
    }
}