import {IAction} from "../actions/action.interface"
import {ILocation} from "./location.interface"
import {LocationParams} from "../data/location-params"
import {Locations} from "./locations"

export class Location implements ILocation {

    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams

    constructor(id: string = Locations.Start, title: string, description: string, actions: IAction[], params: LocationParams) {
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