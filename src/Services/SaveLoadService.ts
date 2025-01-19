import {ISaveLoadService} from "./ISaveLoadService"
import {GameProgressData} from "../Data/GameProgressData";
import * as fs from "node:fs";
import {Action, GameData, IAction, ILocation, Location, LocationParams} from "../Data/GameData";
import {ICreature} from "../Models/Enemies/ICreature"
import {EnemyFactory} from "../Factories/EnemyFactory"
import {IEnemyParams} from "../Models/Enemies/IEnemyParams"
import {IThingParams} from "../Models/Things/IThingParams"
import {ThingFactory} from "../Factories/ThingFactory"

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
                action?.command,
                action?.title,
                action?.description,
                action?.messageAfterExecute,
                action?.params,
            ))
            return new Location(location.id, location.title, location.description, actions, new LocationParams());
        })

        gameData.enemies = jsonData.enemies.map((enemy: IEnemyParams) => {
            return EnemyFactory.createEnemy(enemy)
        })

        gameData.things = jsonData.things.map((thing: IThingParams) => {
            return ThingFactory.createThing(thing)
        })

        return gameData
    }
}

