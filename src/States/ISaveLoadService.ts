import {GameProgressData} from "./SaveLoadService"
import {ActionData} from "../Data/ActionData"

export interface ISaveLoadService {
    saveProgress(): void
    loadProgress(): GameProgressData | null
    loadLevel(): ActionData
}