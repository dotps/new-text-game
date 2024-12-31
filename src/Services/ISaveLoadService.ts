import {GameProgressData} from "./SaveLoadService"
import {ActionData} from "../Data/ActionData"

export interface ISaveLoadService {
    saveProgress(progress: GameProgressData): boolean
    loadProgress(): GameProgressData
    loadLevel(): ActionData
}