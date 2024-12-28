import {StateMachine} from "./StateMachine"
import {IModel} from "../IModel"
import {SaveLoadService} from "./SaveLoadService"
import {ISaveLoadService} from "./ISaveLoadService"

export class LoadLevelState implements IState {

    private _stateMachine: StateMachine
    private _saveLoadService: ISaveLoadService
    private _model: IModel

    constructor(stateMachine: StateMachine, model: IModel) {
        this._stateMachine = stateMachine
        this._model = model
        this._saveLoadService = new SaveLoadService()
    }

    enter(): void {
        console.log("enter " + this.constructor.name)
        // TODO: реализовать загрузку данных уровня
        this._saveLoadService.loadProgress()
    }

    exit(): void {
        console.log("exit " + this.constructor.name)
    }
}