import {StateMachine} from "./StateMachine"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {SaveLoadService} from "../Services/SaveLoadService"
import {IModel} from "../Models/IModel"
import {LoadLevelState} from "./LoadLevelState"
import {IService} from "../Services/IService";

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
        console.log("enter " + this.constructor.name)
        this._model.progressData = this._saveLoadService.loadProgress() ?? this.initProgress()
        console.log("progress", this._model.progressData)
        this._stateMachine.enter(LoadLevelState)
    }

    private initProgress() {
        return {
            levelId: 0,
        }
    }
    exit(): void {
        console.log("exit " + this.constructor.name)
    }

}