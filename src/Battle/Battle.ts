import {ICreature} from "../Models/Creatures/ICreature"
import {IBattle} from "./IBattle"

export class Battle implements IBattle {
    private readonly enemy: ICreature | null = null
    private readonly afterBattleLocationId: string

    constructor(enemy?: ICreature | null, afterBattleLocationId?: string) {
        this.afterBattleLocationId = afterBattleLocationId || ""
        this.enemy = enemy || null
    }

    getAfterBattleLocationId(): string {
        return this.afterBattleLocationId
    }

    getEnemy(): ICreature | null {
        return this.enemy
    }
}