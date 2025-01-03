// export class GameData {
//     public locations: Location[] = []
// }
//
// class Action {
// }
//
// export class Location {
//     id: string = ""
//     title: string = ""
//     description: string = ""
//     actions: Action[] = []
// }

import {log} from "node:util";

export interface IAction {
    command: string
    title: string
    description: string
    nextLocationId: string | null
}

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
}

export class GameData {
    locations: ILocation[] = []

    getLocation(locationId: string): ILocation {
        const location = this.locations.find(location => location.id === locationId)
        if (!location) {
            console.error("Location not exist")
            return {id: "start", actions: [], description: "", title: ""}
        }

        return location
    }

    //TODO: переделать ILocation на класс Location

}
