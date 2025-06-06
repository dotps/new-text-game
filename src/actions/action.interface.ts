import {IActionParams} from "../data/action-params.interface"

export interface IAction {
    command: string
    title: string
    description: string
    messageAfterExecute: string
    params: IActionParams
}