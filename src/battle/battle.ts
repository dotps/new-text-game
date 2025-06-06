import {IBattle} from "./battle.interface"
import {ICreature} from "../models/Creatures/creature.interface"

export class Battle implements IBattle {
    private readonly _enemy: ICreature | null = null
    private readonly _afterBattleLocationId: string

    constructor(enemy?: ICreature | null, afterBattleLocationId?: string) {
        this._afterBattleLocationId = afterBattleLocationId || ""
        this._enemy = enemy || null
    }

    get afterBattleLocationId(): string {
        return this._afterBattleLocationId
    }

    get enemy(): ICreature | null {
        return this._enemy
    }
}