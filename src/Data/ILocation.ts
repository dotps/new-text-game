import {LocationParams} from "./LocationParams"
import {IAction} from "./IAction"

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams

    setActions(actions: IAction[]): void
    setParams(params: LocationParams): void
}