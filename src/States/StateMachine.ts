import {LoadProgressState} from "./LoadProgressState"
import {LoadLevelState} from "./LoadLevelState"
import {IModel} from "../Models/IModel"
import {SaveLoadService} from "../Services/SaveLoadService"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {InputOutputService} from "../Services/InputOutputService"
import {Services} from "../Services/Services"
import {InputState} from "./InputState"
import {IInputOuotputService} from "../Services/IInputOuotputService"
import {ExitState} from "./ExitState"
import {InputHandlerBattleState} from "./InputHandlerBattleState"
import {InputHandlerState} from "./InputHandlerState"
import {LocationState} from "./LocationState"
import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {GameOverState} from "./GameOverState"
import {BattleState} from "./BattleState"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"

export class StateMachine implements IStateMachine {

    private states: Map<new (...args: any[]) => IState, IState> = new Map()
    private current: IState | null = null

    constructor(model: IModel, view: IView, services: Services) {

        const saveLoadService: ISaveLoadService = services.get(SaveLoadService)
        const inputOutputService: IInputOuotputService = services.get(InputOutputService)

        this.states.set(LoadProgressState, new LoadProgressState(this, model, saveLoadService))
        this.states.set(LoadLevelState, new LoadLevelState(this, model, saveLoadService))

        this.states.set(InputState, new InputState(this, model, inputOutputService))
        this.states.set(InputHandlerState, new InputHandlerState(this, model, view))
        this.states.set(InputHandlerBattleState, new InputHandlerBattleState(this, model, view))

        this.states.set(GameOverState, new GameOverState(this, view))
        this.states.set(ExitState, new ExitState())

        this.states.set(LocationState, new LocationState(this, model, view))

        this.states.set(BattleState, new BattleState(this, model, view))
        this.states.set(BattlePlayerTurnState, new BattlePlayerTurnState(this, model, view))
        // this.states.set(BattleEnemyTurnState, new BattleEnemyTurnState(this, model, view))
    }

    enter(stateType: new (...args: any[]) => IState, nextStateType?: new (...args: any[]) => IState): void {
        this.changeState(stateType, nextStateType)
    }

    changeState(stateType: new (...args: any[]) => IState, nextStateType?: new (...args: any[]) => IState): void {
        this.current?.exit()
        const state = this.states.get(stateType)
        if (state) {
            this.current = state
            this.current.enter(nextStateType)
        } else {
            console.error(`State ${stateType.name} not found!`)
        }
    }
}