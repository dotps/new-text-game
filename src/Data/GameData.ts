export class Action implements IAction {
    command: string
    title: string
    description: string
    params: IActionParams
    stateParams: Record<string, string>

    constructor(command: string, title: string, description: string, params: IActionParams, stateParams: Record<string, string>) {
        this.command = command
        this.title = title
        this.description = description
        this.params = params
        this.stateParams = stateParams
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

        // TODO: так не работает конструктор не вызывается повторно, нужно где-то в другом месте делать
        console.log("====")
        console.log(this.params.description)
        console.log("====")

        if (this.params?.description) {
            console.log("+++++++++++++++++")
            this.description = this.params.description
        }
    }
}

export class LocationParams {
    readonly locationId: string
    readonly isDisableDescription: boolean
    readonly isGameOver: boolean
    readonly description: string

    constructor(params: IActionParams = {}) {
        this.isDisableDescription = params?.isDisableDescription === true
        this.locationId = params?.locationId?.toString() || "start"
        this.isGameOver = params?.isGameOver === true
        this.description = params?.description?.toString()
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
    stateParams: Record<string, string>
}

export class GameData {
    locations: ILocation[] = []
    commands: Record<string, IAction> = {}

    getLocation(locationId: string): ILocation {
        const location = this.locations.find(location => location.id === locationId)
        if (!location) {
            throw new Error(`Location ${locationId} not found!`)
        }
        return location
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
