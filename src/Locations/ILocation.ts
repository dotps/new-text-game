import {LocationParams} from "../Data/LocationParams"
import {IAction} from "../Actions/IAction"

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
    params: LocationParams

    setActions(actions: IAction[]): void
    setParams(params: LocationParams): void
}