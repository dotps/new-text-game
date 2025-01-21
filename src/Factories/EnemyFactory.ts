import {ICreature} from "../Models/Creatures/ICreature"
import {Wolf} from "../Models/Creatures/Enemies/Wolf"
import {ICreatureParams} from "../Models/Creatures/ICreatureParams"
import {Enemies} from "../Models/Creatures/Enemies/Enemies"

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