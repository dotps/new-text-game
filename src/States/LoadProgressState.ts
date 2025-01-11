import {ISaveLoadService} from "../Services/ISaveLoadService"
import {IModel} from "../Models/IModel"
import {LoadLevelState} from "./LoadLevelState"
import {GameProgressData} from "../Data/GameProgressData";
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"

export class LoadProgressState implements IState {

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
        this.model.progressData = this.saveLoadService.loadProgress() ?? this.initProgress()
        this.stateMachine.enter(LoadLevelState)
    }

    private initProgress() {
        return new GameProgressData()
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }

}