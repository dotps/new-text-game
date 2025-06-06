import {ICreatureParams} from "./creature-params.interface"
import {ICreature} from "./creature.interface"

export class Creature implements ICreature {

    readonly id: string = ""
    readonly title: string = ""
    readonly damage: number = 1
    readonly damageText: string = ""
    protected healthPoints: number = 1
    protected lootIdList: string[] = []

    constructor(params?: ICreatureParams) {
        this.id = params?.id?.toString() || this.id
        this.title = params?.title?.toString() || this.title
        this.damage = Number(params?.damage) || this.damage
        this.damageText = params?.damageText?.toString() || this.title
        this.healthPoints = Number(params?.health) || this.healthPoints
        if (params?.loot && Array.isArray(params.loot)) {
            this.assignLootId(params.loot)
        }
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

    get lootIds() {
        return this.lootIdList
    }

    private assignLootId(lootParams: ILootParams[]) {
        if (!lootParams) return

        for (const loot of lootParams) {
            const thingId = loot.thingId
            if (thingId) this.lootIds.push(thingId)
        }
    }
}

export interface ILootParams {
    thingId: string
}