import {IThing} from "../Things/IThing"

export interface IEnemy {
    id: string
    title: string
    damage: number
    damageText: string
    health: number

    takeDamage(thing: IThing | null): string
    isAlive(): boolean
}

