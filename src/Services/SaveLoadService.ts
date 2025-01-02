import {ISaveLoadService} from "./ISaveLoadService"
import {ActionData} from "../Data/ActionData"
import {GameProgressData} from "../Data/GameProgressData";
import * as fs from "node:fs";
import {GameData, ILocation} from "../Data/GameData";

export class SaveLoadService implements ISaveLoadService {

    saveProgress(progressData: GameProgressData): boolean {
        return true
    }

    loadProgress(): GameProgressData {
        return new GameProgressData()
    }

    loadGameData(): GameData {
        console.log("loadLevel")
        // TODO: add try catch
        const data = fs.readFileSync("./Data/level.json", "utf-8")
        const jsonData = JSON.parse(data)
        const gameData = new GameData()
        gameData.locations = jsonData.locations
        return gameData
    }
}

