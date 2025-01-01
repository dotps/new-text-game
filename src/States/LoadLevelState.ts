import {StateMachine} from "./StateMachine"
import {IModel} from "../Models/IModel"
import {SaveLoadService} from "../Services/SaveLoadService"
import {ISaveLoadService} from "../Services/ISaveLoadService"
import {IService} from "../Services/IService";
import {InputState} from "./InputState";

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
        console.log("enter " + this.constructor.name)
        // TODO: тут использовать метод, а не присаивание публичному полу
        this._model.progress = this._saveLoadService.loadProgress()
        this._stateMachine.enter(InputState)
    }

    exit(): void {
        console.log("exit " + this.constructor.name)
    }
}