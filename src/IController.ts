import {IModel} from "./IModel"
import {ActionData} from "./ActionData"

export interface IController {
    init(): void
    run(): void
}