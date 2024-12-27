import {StateMachine} from "./StateMachine"
import {ISaveLoadService} from "./ISaveLoadService"
import {SaveLoadService} from "./SaveLoadService"
import {IModel} from "../IModel"

export class LoadProgressState implements IState {

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
        const progress = this._saveLoadService.load() ?? this.initProgress();
        console.log("progress", progress)
        this._model.progress = progress;
        // this._stateMachine.enter(LoadLevelState)
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