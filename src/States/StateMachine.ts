import {ActionState} from "./ActionState"
import {LoadProgressState} from "./LoadProgressState"
import {BootstrapState} from "./BootstrapState"
import {LoadLevelState} from "./LoadLevelState"
import {IModel} from "../Models/IModel"
import {SaveLoadService} from "../Services/SaveLoadService";
import {ISaveLoadService} from "../Services/ISaveLoadService";
import {IOService} from "../Services/IOService";
import {IService} from "../Services/IService";
import {Services} from "../Services/Services";

export class StateMachine {

    private _states: Map<new (...args: any[]) => IState, IState> = new Map()
    private _current: IState | null = null

    constructor(model: IModel, services: Services) {
        this._states.set(BootstrapState, new BootstrapState(this, services))
        const saveLoadService: ISaveLoadService = services.get(SaveLoadService)
        this._states.set(LoadProgressState, new LoadProgressState(this, model, saveLoadService))
        this._states.set(LoadLevelState, new LoadLevelState(this, model, saveLoadService))
        // this._states.set(StartGameState, new StartGameState())
        // this._states.set(ActionState, new ActionState())
    }

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