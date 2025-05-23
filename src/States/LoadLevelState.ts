import {IModel} from "../Models/IModel"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {LocationState} from "./LocationState";
import {IStateMachine} from "./IStateMachine"
import {ExitState} from "./ExitState"
import {IState} from "./IState"

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