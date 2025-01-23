import {LocationParams} from "../Data/LocationParams"
import {Locations} from "./Locations"
import {ILocation} from "./ILocation"
import {IAction} from "../Actions/IAction"

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
    }

    addActions(actions: IAction[]): void {
        this.actions = this.actions.concat(actions)
    }

    setActions(actions: IAction[]) {
        this.actions = actions
    }

    setParams(params: LocationParams): void {
        this.params = params
        this.changeLocationDataFromAction()
    }

    private changeLocationDataFromAction() {
        if (this.params?.locationDescription) {
            this.description = this.params.locationDescription
        }
    }
}