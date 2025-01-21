import {IAction} from "./IAction"

export interface IActionParams {
    [key: string]: string | number | boolean | IAction | IActionParams
}