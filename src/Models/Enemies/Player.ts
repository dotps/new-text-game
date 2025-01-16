import {IEnemyParams} from "./IEnemyParams"
import {IEnemy} from "./IEnemy"
import {CommandFactory} from "../../Factories/CommandFactory"

export class Player implements IEnemy {

    readonly id: string
    readonly title: string
    readonly damage: number
    readonly damageText: string
    health: number = 1

    private deathMessage = "Вы нанесли урон. Противник погиб."

    constructor(params: IEnemyParams) {
        this.id = params?.id?.toString()
        this.title = params?.title?.toString()
        this.damage = Number(params?.damage)
        this.damageText = params?.damageText?.toString()
        const health = Number(params?.health)
        this.health = health ?? this.health
    }

    takeDamage(enemy: IEnemy | null): string {
        if (enemy) {
            console.log(enemy)
            this.health -= enemy.damage
            if (this.health <= 0) {
                // TODO: надо как-то завершить игру когда получил урон
            }
        }
        return enemy?.damageText ? enemy.damageText : ""
    }
}