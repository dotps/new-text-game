import {IThing} from "../Things/thing.interface"

export interface ICreature {
    id: string
    title: string
    damage: number
    damageText: string
    health: number
    lootIds: string[]

    takeDamage(thing: IThing | null): string
    isAlive(): boolean
}

