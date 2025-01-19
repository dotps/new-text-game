import {IEnemyParams} from "./IEnemyParams"
import {ICreature} from "./ICreature"
import {CommandFactory} from "../../Factories/CommandFactory"

export class Creature implements ICreature {

    readonly id: string
    readonly title: string
    readonly damage: number = 1
    readonly damageText: string
    protected healthPoints: number = 1

    constructor(params: IEnemyParams) {
        this.id = params?.id?.toString()
        this.title = params?.title?.toString()
        this.damage = Number(params?.damage) || this.damage
        this.damageText = params?.damageText?.toString()
        this.healthPoints = Number(params?.health) || this.healthPoints
    }

    takeDamage(enemy: ICreature | null): string {
        if (!enemy) return ""
        this.healthPoints -= enemy.damage
        return enemy.damageText
    }

    isAlive(): boolean {
        return this.healthPoints > 0
    }

    get health() {
        return this.healthPoints
    }
}