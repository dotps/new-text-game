import {ICreature} from "../Models/Creatures/ICreature"
import {Logger} from "../Utils/Logger"
import {IThing} from "../Models/Things/IThing"
import {LocationParams} from "./LocationParams"
import {Location} from "../Locations/Location"
import {ILocation} from "../Locations/ILocation"

export class GameData {
    locations: ILocation[] = []
    enemies: ICreature[] = []
    things: IThing[] = []

    getLocation(id: string): ILocation {
        const location = this.locations.find(location => location.id === id)
        if (!location) throw new Error(`Location ${id} not found!`)
        return new Location(location.id, location.title, location.description, location.actions, new LocationParams())
    }

    getEnemy(id: string): ICreature | null {
        let enemy = this.enemies.find(enemy => enemy.id === id)
        if (!enemy) {
            Logger.error(`Enemy ${id} not found!`)
            return null
        }
        return enemy
    }

    getThing(id: string): IThing | null {
        let thing = this.things.find(thing => thing.id === id)
        if (!thing) {
            Logger.error(`thing ${id} not found!`)
            return null
        }
        return thing
    }
}
