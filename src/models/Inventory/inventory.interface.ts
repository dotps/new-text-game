import {IThing} from "../Things/thing.interface"

export interface IInventory {
    add(thing: IThing | null): void
    get(id: string): IThing | null
    getAll(): IThing[]
}