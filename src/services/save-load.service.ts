import {GameProgressData} from "../data/game-progress.data"
import {ISaveLoadService} from "./save-load.interface"
import {GameData} from "../data/game.data"
import * as fs from "node:fs"
import {Location} from "../locations/location"
import {ILocation} from "../locations/location.interface"
import {Action} from "../actions/action"
import {IAction} from "../actions/action.interface"
import {LocationParams} from "../data/location-params"
import {IThingParams} from "../models/Things/thing-params.interface"
import {ThingFactory} from "../factories/thing.factory"
import {ICreatureParams} from "../models/Creatures/creature-params.interface"
import {EnemyFactory} from "../factories/enemy.factory"
import {Logger} from "../utils/logger"

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

            gameData.things = jsonData.things.map((thing: IThingParams) => {
                return ThingFactory.createThing(thing)
            })

            gameData.enemies = jsonData.enemies.map((enemy: ICreatureParams) => {
                return EnemyFactory.createEnemy(enemy)
            })

            return gameData
        }
        catch (e) {
            Logger.error("Не удалось загрузить данные игры")
            return null
        }
    }
}