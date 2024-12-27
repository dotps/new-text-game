import {StartGameState} from "./StartGameState"
import {ActionState} from "./ActionState"

export class StateMachine {
    private _states: Map<new () => IState, IState> = new Map()
    private _current: IState | null = null

    constructor() {
        this._states.set(StartGameState, new StartGameState());
        this._states.set(ActionState, new ActionState());
    }

    public enter(stateType: new () => IState): void {
        this.changeState(stateType)
    }

    public changeState(stateType: new () => IState): void {

        this._current?.exit();

        const state = this._states.get(stateType);

        if (state) {
            this._current = state;
            this._current.enter();
        } else {
            console.error(`State ${stateType.name} not found!`);
        }
    }

}
