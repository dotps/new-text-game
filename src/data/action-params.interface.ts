import {IAction} from "../actions/action.interface"

export interface IActionParams {
    [key: string]: string | number | boolean | IAction | IActionParams
}