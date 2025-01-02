import {IService} from "./IService";
import {GameProgressData} from "../Data/GameProgressData";
import {GameData, ILocation} from "../Data/GameData";

export interface ISaveLoadService extends IService {
    saveProgress(progress: GameProgressData): boolean
    loadProgress(): GameProgressData
    loadGameData(): GameData
}