export class Action implements IAction {
    command: string
    title: string
    description: string
    params: CommandParams[]
    
    constructor(command: string, title: string, description: string, params: CommandParams[]) {
        this.command = command
        this.title = title
        this.description = description
        this.params = params
    }
}

// TODO: тут добавить интерфейс
export class CommandParams {
    constructor(
        public name: string = "",
        public value: string = "",
    ) {}
}

export class Location implements ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
    
    constructor(id: string = "start", title: string, description: string, actions: IAction[]) {
        this.id = id
        this.title = title
        this.description = description
        this.actions = actions
    }
}

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
}

export interface IAction {
    command: string
    title: string
    description: string
    params: CommandParams[]
}

export class GameData {
    locations: Location[] = []

    getLocation(locationId: string): Location {
        const location = this.locations.find(location => location.id === locationId)
        if (!location) {
            throw new Error(`Location ${locationId} not found!`);
        }
        return location
    }
}
