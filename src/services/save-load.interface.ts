import {GameProgressData} from "../data/game-progress.data"
import {IService} from "./service.interface"
import {GameData} from "../data/game.data"

export interface ISaveLoadService extends IService {
    saveProgress(progress: GameProgressData): boolean
    loadProgress(): GameProgressData
    loadGameData(levelPath: string): GameData | null
}