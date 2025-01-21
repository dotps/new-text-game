import {ISaveLoadService} from "./ISaveLoadService"
import {GameProgressData} from "../Data/GameProgressData";
import * as fs from "node:fs";
import {GameData} from "../Data/GameData";
import {EnemyFactory} from "../Factories/EnemyFactory"
import {ICreatureParams} from "../Models/Creatures/ICreatureParams"
import {IThingParams} from "../Models/Things/IThingParams"
import {ThingFactory} from "../Factories/ThingFactory"
import {Logger} from "../Utils/Logger"
import {LocationParams} from "../Data/LocationParams"
import {Action} from "../Data/Action"
import {Location} from "../Data/Location"
import {ILocation} from "../Data/ILocation"
import {IAction} from "../Data/IAction"

export class SaveLoadService implements ISaveLoadService {

    saveProgress(progressData: GameProgressData): boolean {
        return true
    }

    loadProgress(): GameProgressData {
        return new GameProgressData()
    }

    loadGameData(levelPath: string): GameData | null {

        try {
            const data = fs.readFileSync(levelPath, "utf-8")
            const jsonData = JSON.parse(data)
            const gameData = new GameData()

            gameData.locations = jsonData.locations.map((location: ILocation) => {
                const actions: Action[] = location.actions.map((action: IAction) => new Action(
                    action?.command,
                    action?.title,
                    action?.description,
                    action?.messageAfterExecute,
                    action?.params,
                ))
                return new Location(location.id, location.title, location.description, actions, new LocationParams());
            })

            gameData.enemies = jsonData.enemies.map((enemy: ICreatureParams) => {
                return EnemyFactory.createEnemy(enemy)
            })

            gameData.things = jsonData.things.map((thing: IThingParams) => {
                return ThingFactory.createThing(thing)
            })

            return gameData
        }
        catch (e) {
            Logger.error("Не удалось загрузить данные игры")
            return null
        }
    }
}