import {IStateMachine} from "./state-machine.interface"
import {IModel} from "../models/model.interface"
import {IState} from "./state.interface"
import {IView} from "../views/view.interface"
import {Services} from "../services/services"
import {ISaveLoadService} from "../services/save-load.interface"
import {SaveLoadService} from "../services/save-load.service"
import {IInputOutputService} from "../services/input-output.interface"
import {InputOutputService} from "../services/input-output.service"
import {LoadProgressState} from "./load-progress.state"
import {LoadLevelState} from "./load-level.state"
import {InputState} from "./input.state"
import {InputHandlerState} from "./input-handler.state"
import {InputBattleState} from "./input-battle.state"
import {InputHandlerBattleState} from "./input-handler-battle.state"
import {GameOverState} from "./game-over.state"
import {ExitState} from "./exit.state"
import {LocationState} from "./location.state"
import {BattleStartState} from "./battle-start.state"
import {BattleEndState} from "./battle-end.state"
import {BattlePlayerTurnState} from "./battle-player-turn.state"
import {BattleEnemyTurnState} from "./battle-enemy-turn.state"
import {Logger} from "../utils/logger"

export class StateMachine implements IStateMachine {

    private states: Map<StateClassType, IState> = new Map()
    private current: IState | null = null
    private model: IModel

    constructor(model: IModel, view: IView, services: Services) {
        this.model = model
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

    addState<TState extends IState>(stateClass: StateClassType<TState>, state: TState): void {
        this.states.set(stateClass, state)
    }

    enter<TState extends IState>(stateType: StateClassType<TState>): void {
        this.changeState<TState>(stateType);
    }

    changeState<TState extends IState>(stateType: StateClassType<TState>): void {
        if (this.current) {
            Logger.log("exit " + this.current.constructor.name)
            this.current.exit()
        }

        const state = this.states.get(stateType)

        if (state) {
            this.current = state
            this.model.setCurrentState(this.current)
            Logger.log("enter " + this.current.constructor.name)
            this.current.enter()
        } else {
            console.error(`Состояние ${stateType.name} не найдено!`)
        }
    }
}

export type StateClassType<TState extends IState = IState> = new (...args: any[]) => TState