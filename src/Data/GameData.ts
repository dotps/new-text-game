export interface IAction {
    title: string
    description: string
    command: string
    params: ICommandParams[]
}

export class Action implements IAction {
    title: string = ""
    description: string = ""
    command: string = ""
    params: ICommandParams[] = []
}

interface ICommandParams {
    name: string
    value: string
}

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
}

export class Location implements ILocation {
    id: string = ""
    title: string = ""
    description: string = ""
    actions: Action[] = []
}

export class GameData {
    locations: Location[] = []

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
