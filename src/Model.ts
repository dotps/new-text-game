import {IModel} from "./IModel";
import {ActionData} from "./ActionData"
import {StateMachine} from "./StateMachine"
import {StartGameState} from "./StartGameState"
import {ActionState} from "./ActionState"

export class Model implements IModel {

    private _stateMachine =  new StateMachine();

    constructor() {
        this._stateMachine.enter(StartGameState);
        // this._stateMachine.enter(ActionState);
    }

    getStartData(): ActionData {
        return {text: "Who are you?"}
    }
}