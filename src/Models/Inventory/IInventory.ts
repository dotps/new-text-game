import {IThing} from "../../Data/GameData"

export interface IInventory {
    // things: IThing[]
    add(thing: IThing): void
    get(id: string): IThing | null
}