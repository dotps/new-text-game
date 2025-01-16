import {IEnemyParams} from "./IEnemyParams"
import {IThing} from "../Things/IThing"
import {IEnemy} from "./IEnemy"

export class Wolf implements IEnemy {

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


    takeDamage(thing: IThing | null): string {
        if (thing?.damage === 0 ) {
            return thing.damageText
        }

        return this.deathMessage
    }
}