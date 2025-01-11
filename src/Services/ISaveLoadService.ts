import {IService} from "./IService";
import {GameProgressData} from "../Data/GameProgressData";
import {GameData} from "../Data/GameData";

export interface ISaveLoadService extends IService {
    saveProgress(progress: GameProgressData): boolean
    loadProgress(): GameProgressData
    loadGameData(levelPath: string): GameData
}