import {IEnemyParams} from "./IEnemyParams"
import {IEnemy} from "./IEnemy"
import {CommandFactory} from "../../Factories/CommandFactory"

export class Player implements IEnemy {

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

    takeDamage(enemy: IEnemy | null): string {
        if (!enemy) return ""
        this.health -= enemy.damage
        return enemy.damageText
    }

    isAlive(): boolean {
        return this.health > 0
    }
}