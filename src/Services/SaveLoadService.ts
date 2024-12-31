import {ISaveLoadService} from "./ISaveLoadService"
import {ActionData} from "../Data/ActionData"

export class SaveLoadService implements ISaveLoadService {
    loadLevel(): ActionData {
        return {
            text: "Level 1"

        }
    }
    saveProgress(progress: GameProgressData): boolean {
        return true
    }

    loadProgress(): GameProgressData {
        return new GameProgressData()
    }
}

export class GameProgressData {
    public currentLocation: string = ""
}