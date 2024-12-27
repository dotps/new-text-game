import {ActionState} from "./ActionState"
import {LoadProgressState} from "./LoadProgressState"
import {BootstrapState} from "./BootstrapState"
import {LoadLevelState} from "./LoadLevelState"
import {IModel} from "../IModel"

export class StateMachine {
    // private _states: Map<new () => IState, IState> = new Map();
    private _states: Map<new (...args: any[]) => IState, IState> = new Map()
    private _current: IState | null = null

    constructor(model: IModel) {
        this._states.set(BootstrapState, new BootstrapState(this))
        this._states.set(LoadProgressState, new LoadProgressState(this, model))
        this._states.set(LoadLevelState, new LoadLevelState())
        // this._states.set(StartGameState, new StartGameState())
        // this._states.set(ActionState, new ActionState())
    }

    // public enter(stateType: new (...args: any[]) => IState): void {
    //     this.changeState(stateType);
    // }

    public enter(stateType: new (...args: any[]) => IState): void {
        this.changeState(stateType)
    }

    public changeState(stateType: new (...args: any[]) => IState): void {
        this._current?.exit()
        const state = this._states.get(stateType)
        if (state) {
            state.enter()
        } else {
            console.error(`State ${stateType.name} not found!`)
        }
    }
}


/*
export class StateMachine {
    private _states: Map<new () => IState, () => IState> = new Map()
    private _current: IState | null = null

    constructor() {
        this._states.set(LoadProgressState, () => new LoadProgressState(this));
        this._states.set(StartGameState, () => new StartGameState());
        this._states.set(ActionState, () => new ActionState());
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


}*/
