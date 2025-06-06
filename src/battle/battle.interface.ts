import {ICreature} from "../models/Creatures/creature.interface"

export interface IBattle {
    getEnemy(): ICreature | null
    getAfterBattleLocationId(): string
}