import {IEnemyParams} from "./IEnemyParams"
import {IThing} from "../Things/IThing"
import {IEnemy} from "./IEnemy"

export class Wolf implements IEnemy {

    readonly id: string
    readonly title: string
    readonly damage: number = 1
    readonly damageText: string
    health: number = 1

    constructor(params: IEnemyParams) {
        this.id = params?.id?.toString()
        this.title = params?.title?.toString()
        this.damage = Number(params?.damage) || this.damage
        this.damageText = params?.damageText?.toString()
        this.health = Number(params?.health) || this.health
    }

    takeDamage(thing: IThing | null): string {
        if (!thing) return ""
        this.health -= thing.damage
        return thing.damageText
    }

    isAlive(): boolean {
        return this.health > 0
    }
}