import {ActionState} from "./ActionState"
import {LoadProgressState} from "./LoadProgressState"
import {BootstrapState} from "./BootstrapState"
import {LoadLevelState} from "./LoadLevelState"
import {IModel} from "../Models/IModel"
import {SaveLoadService} from "../Services/SaveLoadService"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {IOService} from "../Services/IOService"
import {Services} from "../Services/Services"
import {InputState} from "./InputState"
import {IIOService} from "../Services/IIOService"
import {ExitState} from "./ExitState"
import {InputHandlerState} from "./InputHandlerState"
import {StartGameState} from "./StartGameState"
import {IView} from "../Views/IView"
import {LoggerService} from "../Utils/LoggerService"
import {ILoggerService} from "../Utils/ILoggerService"

export class StateMachine {

    private _states: Map<new (...args: any[]) => IState, IState> = new Map()
    private _current: IState | null = null

    constructor(model: IModel, view: IView, services: Services) {
        // this._states.set(BootstrapState, new BootstrapState(this, services))

        const saveLoadService: ISaveLoadService = services.get(SaveLoadService)
        const inputOutputService: IIOService = services.get(IOService)

        this._states.set(LoadProgressState, new LoadProgressState(this, model, saveLoadService))
        this._states.set(LoadLevelState, new LoadLevelState(this, model, saveLoadService))
        this._states.set(InputState, new InputState(this, model, inputOutputService))
        this._states.set(InputHandlerState, new InputHandlerState(this, model, inputOutputService))
        this._states.set(ExitState, new ExitState())
        this._states.set(StartGameState, new StartGameState(this, model, view))
        // this._states.set(ActionState, new ActionState())
    }

    public enter(stateType: new (...args: any[]) => IState): void {
        this.changeState(stateType)
    }

    public changeState(stateType: new (...args: any[]) => IState): void {
        this._current?.exit()
        const state = this._states.get(stateType)
        if (state) {
            this._current = state
            this._current.enter()
        } else {
            console.error(`State ${stateType.name} not found!`)
        }
    }
}