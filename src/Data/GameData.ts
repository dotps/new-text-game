import {ICreature} from "../Models/Enemies/ICreature"
import {Logger} from "../Utils/Logger"
import {IThing} from "../Models/Things/IThing"
import {Locations} from "./Locations"

export class Action implements IAction {
    command: string
    title: string
    description: string
    messageAfterExecute: string
    params: IActionParams

    constructor(command: string, title: string, description: string, messageAfterExecute: string, params: IActionParams) {
        this.command = command
        this.title = title
        this.description = description
        this.messageAfterExecute = messageAfterExecute
        this.params = params
    }
}

export class Location implements ILocation {

    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams

    constructor(id: string = Locations.START, title: string, description: string, actions: IAction[], params: LocationParams) {
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

    setActions(actions: IAction[]) {
        this.actions = actions
    }
}

export class LocationParams {
    locationId: string
    locationDescription: string
    isGameOver: boolean

    constructor(params: IActionParams = {}) {
        this.locationId = params?.locationId?.toString() || Locations.START
        this.locationDescription = params?.locationDescription?.toString()
        this.isGameOver = params?.isGameOver === true
    }
}

export interface IActionParams {
    [key: string]: string | number | boolean | IAction | IActionParams
}

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams

    setActions(actions: IAction[]): void
}

export interface IAction {
    command: string
    title: string
    description: string
    messageAfterExecute: string
    params: IActionParams
}

export class GameData {
    locations: ILocation[] = []
    enemies: ICreature[] = []
    commands: Record<string, IAction> = {}
    things: IThing[] = []

    getLocation(locationParams: LocationParams): ILocation {
        const location = this.locations.find(location => location.id === locationParams.locationId)
        if (!location) {
            throw new Error(`Location ${locationParams.locationId} not found!`)
        }
        return new Location(location.id, location.title, location.description, location.actions, locationParams)
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

    // TODO: разобраться с командами, вроде уже ненужный функционал
    initCommands(): void {
        if (!this.locations) return

        this.locations.forEach(location => {
            location.actions.forEach(action => {
                this.commands[action.command] = action
            })
        })
    }
}
