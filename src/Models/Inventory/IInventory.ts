import {IThing} from "../Things/IThing"

export interface IInventory {
    add(thing: IThing | null): void
    get(id: string): IThing | null
    getAll(): IThing[]
}