import {ILocation} from "../locations/location.interface"
import {Location} from "../locations/location"
import {ICreature} from "../models/Creatures/creature.interface"
import {IThing} from "../models/Things/thing.interface"
import {LocationParams} from "./location-params"
import {Logger} from "../utils/logger"

export class GameData {
    locations: ILocation[] = []
    enemies: ICreature[] = []
    things: IThing[] = []

    getLocation(id: string): ILocation {
        const location = this.locations.find(location => location.id === id)
        if (!location) throw new Error(`Локация ${id} не найдена!`)
        return new Location(location.id, location.title, location.description, location.actions, new LocationParams())
    }

    getEnemy(id: string): ICreature | null {
        let enemy = this.enemies.find(enemy => enemy.id === id)
        if (!enemy) {
            Logger.error(`Враг ${id} не найден!`)
            return null
        }
        return enemy
    }

    getThing(id: string): IThing | null {
        let thing = this.things.find(thing => thing.id === id)
        if (!thing) {
            Logger.error(`Вещь ${id} не найдена!`)
            return null
        }
        return thing
    }
}
