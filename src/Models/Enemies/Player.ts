import {IEnemyParams} from "./IEnemyParams"
import {IEnemy} from "./IEnemy"

export class Player implements IEnemy {

    readonly id: string
    readonly title: string
    readonly damage: number
    readonly damageText: string
    // health: number

    private deathMessage = "Вы нанесли урон. Противник погиб."

    constructor(params: IEnemyParams) {
        this.id = params?.id?.toString()
        this.title = params?.title?.toString()
        // this.health = Number(params?.health)
        this.damage = Number(params?.damage)
        this.damageText = params?.damageText?.toString()
    }

    takeDamage(enemy: IEnemy | null): string {
        console.log(enemy)
        // TODO: надо как-то завершить игру когда получил урон
        return enemy?.damageText ? enemy.damageText : ""
    }
}