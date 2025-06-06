import {ICreatureParams} from "../models/Creatures/creature-params.interface"
import {ICreature} from "../models/Creatures/creature.interface"
import {Enemies} from "../models/Creatures/Enemies/enemies"
import {Wolf} from "../models/Creatures/Enemies/wolf"

export class EnemyFactory {
    static createEnemy(params: ICreatureParams): ICreature | null {
        switch (params.id) {
            case Enemies.WOLF:
                return new Wolf(params)

            default:
                return null
        }
    }
}