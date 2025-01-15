import { IThing } from "../../Data/GameData";
import {IInventory} from "./IInventory"

export class Inventory implements IInventory {
    private things: IThing[]

    constructor(things: IThing[]) {
        this.things = things
    }

    add(thing: IThing): void {
        this.things.push(thing)
    }

    get(id: string): IThing | null {
        const thing = this.things.find((t) => t.id === id);
        if (!thing) {
            console.log(`Вещь с ID "${id}" не найдена в инвентаре.`)
            return null
        }
        return thing
    }
}