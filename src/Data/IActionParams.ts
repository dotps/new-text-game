import {IAction} from "../Actions/IAction"

export interface IActionParams {
    [key: string]: string | number | boolean | IAction | IActionParams
}