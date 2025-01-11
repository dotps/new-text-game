import {IModel} from "../Models/IModel"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {LocationState} from "./LocationState";
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"

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
        Logger.log("enter " + this.constructor.name)
        const levelPath = this.model.progressData.currentLevelPath
        this.model.setGameData(this.saveLoadService.loadGameData(levelPath))
        this.stateMachine.enter(LocationState)
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }
}