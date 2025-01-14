export class Action implements IAction {
    command: string
    title: string
    description: string
    params: IActionParams

    constructor(command: string, title: string, description: string, params: IActionParams) {
        this.command = command
        this.title = title
        this.description = description
        this.params = params
    }
}

export class Location implements ILocation {

    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams

    constructor(id: string = "start", title: string, description: string, actions: IAction[], params: LocationParams) {
        this.id = id
        this.title = title
        this.description = description
        this.actions = actions
        this.params = params

        this.changeLocationDataFromAction(this.params)
    }

    private changeLocationDataFromAction(params: LocationParams) {
        if (this.params?.locationDescription) {
            this.description = this.params.locationDescription
        }
    }
}

export class LocationParams {
    readonly locationId: string
    readonly locationDescription: string
    readonly isGameOver: boolean

    constructor(params: IActionParams = {}) {
        this.locationId = params?.locationId?.toString() || "start"
        this.locationDescription = params?.locationDescription?.toString()
        this.isGameOver = params?.isGameOver === true
    }
}
export interface IActionParams {
    [key: string]: string | number | boolean
}

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams
}

export interface IAction {
    command: string
    title: string
    description: string
    params: IActionParams
}

export class GameData {
    locations: ILocation[] = []
    commands: Record<string, IAction> = {}

    getLocation(locationParams: LocationParams): ILocation {
        const location = this.locations.find(location => location.id === locationParams.locationId)
        if (!location) {
            throw new Error(`Location ${locationParams.locationId} not found!`)
        }
        return new Location(location.id, location.title, location.description, location.actions, locationParams)
    }

    // TODO: разобраться с командами, вроде уже ненужный функционал
    initCommands(): void {
        if (!this.locations) return

        this.locations.forEach(location => {
            location.actions.forEach(action => {
                this.commands[action.command] = action
            })
        })
    }

    getCommand(commandName: string): IAction | undefined {
        if (commandName in this.commands) {
            return this.commands[commandName]
        } else {
            throw new Error(`Command ${commandName} not found!`);
        }
    }

    getCountCommands(): number {
        console.log(this.commands)
        return Object.keys(this.commands).length
    }

    getCountActions(): number {
        console.log(this.commands)
        return Object.keys(this.commands).length
    }
}
