import {IModel} from "./IModel"
import {ActionData} from "./ActionData"

export interface IController {
    init(): void
    read(message: object): Promise<ActionData>
    write(message: object): void
    run(): void
}