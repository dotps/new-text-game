import {ISaveLoadService} from "./ISaveLoadService"
import {GameProgressData} from "../Data/GameProgressData";
import * as fs from "node:fs";
import {Action, GameData, IAction, ILocation, Location, LocationParams} from "../Data/GameData";

export class SaveLoadService implements ISaveLoadService {

    saveProgress(progressData: GameProgressData): boolean {
        return true
    }

    loadProgress(): GameProgressData {
        return new GameProgressData()
    }

    loadGameData(levelPath: string): GameData {

        // TODO: add try catch
        const data = fs.readFileSync(levelPath, "utf-8")
        const jsonData = JSON.parse(data)
        const gameData = new GameData()

        gameData.locations = jsonData.locations.map((location: ILocation) => {
            const actions: Action[] = location.actions.map((action: IAction) => new Action(
                action.command,
                action.title,
                action.description,
                action.params,
            ))
            return new Location(location.id, location.title, location.description, actions, new LocationParams());
        })

        return gameData
    }
}

