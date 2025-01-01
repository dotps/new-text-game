import {GameProgressData} from "./SaveLoadService"
import {ActionData} from "../Data/ActionData"
import {IService} from "./IService";

export interface ISaveLoadService extends IService {
    saveProgress(progress: GameProgressData): boolean
    loadProgress(): GameProgressData
    loadLevel(): ActionData
}