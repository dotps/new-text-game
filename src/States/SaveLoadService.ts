import {ISaveLoadService} from "./ISaveLoadService"
import {ActionData} from "../Data/ActionData"

export class SaveLoadService implements ISaveLoadService {
    loadLevel(): ActionData {
        return {
            text: "Level 1"

        }
    }
    saveProgress(): void {

    }

    loadProgress(): GameProgressData | null {
        return null
    }
}

export type GameProgressData = {
    currentLocation: string
}