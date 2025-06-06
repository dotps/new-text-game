import {LocationParams} from "../data/location-params"
import {IAction} from "../actions/action.interface"

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams

    setActions(actions: IAction[]): void
    addActions(actions: IAction[]): void
    setParams(params: LocationParams): void
}