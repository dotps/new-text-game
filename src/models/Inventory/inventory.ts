import {IThing} from "../Things/thing.interface"
import {IInventory} from "./inventory.interface"
import {Logger} from "../../utils/logger"

export class Inventory implements IInventory {

    private readonly things: IThing[] = []

    constructor(things: IThing[]) {
        this.things = things
    }

    add(thing: IThing | null): void {
        if (!thing) return
        this.things.push(thing)
    }

    get(id: string): IThing | null {
        const thing = this.things.find((t) => t.id === id);
        if (!thing) {
            Logger.error(`Вещь "${id}" не найдена в инвентаре.`)
            return null
        }
        return thing
    }

    getAll(): IThing[] {
        return this.things
    }
}