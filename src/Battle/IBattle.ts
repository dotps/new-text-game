import {ICreature} from "../Models/Creatures/ICreature"

export interface IBattle {
    getEnemy(): ICreature | null
    getAfterBattleLocationId(): string
}