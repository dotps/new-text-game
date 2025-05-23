import {LoadProgressState} from "./LoadProgressState"
import {LoadLevelState} from "./LoadLevelState"
import {IModel} from "../Models/IModel"
import {SaveLoadService} from "../Services/SaveLoadService"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {InputOutputService} from "../Services/InputOutputService"
import {Services} from "../Services/Services"
import {InputState} from "./InputState"
import {IInputOutputService} from "../Services/IInputOutputService"
import {ExitState} from "./ExitState"
import {InputHandlerBattleState} from "./InputHandlerBattleState"
import {InputHandlerState} from "./InputHandlerState"
import {LocationState} from "./LocationState"
import {IView} from "../Views/IView"
import {IStateMachine} from "./IStateMachine"
import {GameOverState} from "./GameOverState"
import {BattleStartState} from "./BattleStartState"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {InputBattleState} from "./InputBattleState"
import {BattleEnemyTurnState} from "./BattleEnemyTurnState"
import {BattleEndState} from "./BattleEndState"
import {Logger} from "../Utils/Logger"
import {IState} from "./IState"

export class StateMachine implements IStateMachine {

    private states: Map<new (...args: any[]) => IState, IState> = new Map()
    private current: IState | null = null

    constructor(model: IModel, view: IView, services: Services) {

        this.current = model.getCurrentState()

        const saveLoadService: ISaveLoadService = services.get(SaveLoadService)
        const inputOutputService: IInputOutputService = services.get(InputOutputService)

        this.addState(LoadProgressState, new LoadProgressState(this, model, saveLoadService))
        this.addState(LoadLevelState, new LoadLevelState(this, model, saveLoadService))

        this.addState(InputState, new InputState(this, model, inputOutputService))
        this.addState(InputHandlerState, new InputHandlerState(this, model, view))
        this.addState(InputBattleState, new InputBattleState(this, model, inputOutputService))
        this.addState(InputHandlerBattleState, new InputHandlerBattleState(this, model, view))

        this.addState(GameOverState, new GameOverState(this, view, model))
        this.addState(ExitState, new ExitState())

        this.addState(LocationState, new LocationState(this, model, view))

        this.addState(BattleStartState, new BattleStartState(this, model, view))
        this.addState(BattleEndState, new BattleEndState(this, model))
        this.addState(BattlePlayerTurnState, new BattlePlayerTurnState(this, model))
        this.addState(BattleEnemyTurnState, new BattleEnemyTurnState(this, model, view))
    }

    addState<TState extends IState>(stateClass: new (...args: any[]) => TState, state: TState): void {
        this.states.set(stateClass, state)
    }

    enter<TState extends IState>(stateType: new (...args: any[]) => TState): void {
        this.changeState<TState>(stateType);
    }

    changeState<TState extends IState>(stateType: new (...args: any[]) => TState): void {
        if (this.current) {
            Logger.log("exit " + this.current.constructor.name)
            this.current.exit()
        }

        const state = this.states.get(stateType)

        if (state) {
            this.current = state
            Logger.log("enter " + this.current.constructor.name)
            this.current.enter()
        } else {
            console.error(`Состояние ${stateType.name} не найдено!`)
        }
    }
}