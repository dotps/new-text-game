import {IStateMachine} from "./state-machine.interface"
import {ISaveLoadService} from "../services/save-load.interface"
import {IModel} from "../models/model.interface"
import {IState} from "./state.interface"
import {ExitState} from "./exit.state"
import {LocationState} from "./location.state"

export class LoadLevelState implements IState {

    private stateMachine: IStateMachine
    private saveLoadService: ISaveLoadService
    private model: IModel

    constructor(stateMachine: IStateMachine, model: IModel, saveLoadService: ISaveLoadService) {
        this.stateMachine = stateMachine
        this.model = model
        this.saveLoadService = saveLoadService
    }

    enter(): void {
        const levelPath = this.model.progressData.currentLevelPath
        const gameData = this.saveLoadService.loadGameData(levelPath)
        if (!gameData) {
            this.stateMachine.enter(ExitState)
            return
        }
        this.model.setGameData(gameData)
        this.stateMachine.enter(LocationState)
    }

    exit(): void {}
}