import {IStateMachine} from "./state-machine.interface"
import {IState} from "./state.interface"
import {ISaveLoadService} from "../services/save-load.interface"
import {IModel} from "../models/model.interface"
import {LoadLevelState} from "./load-level.state"
import {GameProgressData} from "../data/game-progress.data"

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
        this.model.progressData = this.saveLoadService.loadProgress() ?? this.initProgress()
        this.stateMachine.enter(LoadLevelState)
    }

    private initProgress() {
        return new GameProgressData()
    }

    exit(): void {}

}