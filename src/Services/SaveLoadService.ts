import {ISaveLoadService} from "./ISaveLoadService"
import {GameProgressData} from "../Data/GameProgressData";
import * as fs from "node:fs";
import {Action, GameData, Location} from "../Data/GameData";

export class SaveLoadService implements ISaveLoadService {

    saveProgress(progressData: GameProgressData): boolean {
        return true
    }

    loadProgress(): GameProgressData {
        return new GameProgressData()
    }

    loadGameData(): GameData {

        // TODO: add try catch
        const data = fs.readFileSync("./Data/level.json", "utf-8")
        const jsonData = JSON.parse(data)
        const gameData = new GameData()

        // TODO: сделать обработку несуществующих полей
        gameData.locations = jsonData.locations.map((location: any) => {
            const actions: Action[] = location.actions.map((action: any) => new Action(
                action.command,
                action.title,
                action.description,
                action.params
            ))
            return new Location(location.id, location.title, location.description, actions);
        })

        return gameData
    }
}

