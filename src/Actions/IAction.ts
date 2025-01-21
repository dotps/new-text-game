import {IActionParams} from "../Data/IActionParams"

export interface IAction {
    command: string
    title: string
    description: string
    messageAfterExecute: string
    params: IActionParams
}