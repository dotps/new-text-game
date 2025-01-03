import {StateMachine} from "./StateMachine"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {SaveLoadService} from "../Services/SaveLoadService"
import {IModel} from "../Models/IModel"
import {LoadLevelState} from "./LoadLevelState"
import {IService} from "../Services/IService";
import {GameProgressData} from "../Data/GameProgressData";
import {Logger} from "../Utils/Logger"

export class LoadProgressState implements IState {

    private _stateMachine: StateMachine
    private _saveLoadService: ISaveLoadService
    private _model: IModel

    constructor(stateMachine: StateMachine, model: IModel, saveLoadService: ISaveLoadService) {
        this._stateMachine = stateMachine
        this._model = model
        this._saveLoadService = saveLoadService
    }

    enter(): void {
        Logger.log("enter " + this.constructor.name)
        this._model.progressData = this._saveLoadService.loadProgress() ?? this.initProgress()
        Logger.log(this._model.progressData)
        this._stateMachine.enter(LoadLevelState)
    }

    private initProgress() {
        return new GameProgressData()
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }

}