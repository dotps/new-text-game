import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {SaveLoadService} from "../Services/SaveLoadService"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {IService} from "../Services/IService";
import {InputState} from "./InputState";
import {LocationState} from "./LocationState";
import {Logger} from "../Utils/Logger"

export class LoadLevelState implements IState {

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
        this._model.setGameData(this._saveLoadService.loadGameData())
        this._stateMachine.enter(LocationState)
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
    }
}