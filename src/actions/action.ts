import {IAction} from "./action.interface"
import {IActionParams} from "../data/action-params.interface"

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