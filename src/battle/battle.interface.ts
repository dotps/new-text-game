import {ICreature} from "../models/Creatures/creature.interface"

export interface IBattle {
    get enemy(): ICreature | null
    get afterBattleLocationId(): string
}