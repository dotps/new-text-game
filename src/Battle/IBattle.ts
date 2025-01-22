import {ICreature} from "../Models/Creatures/ICreature"

export interface IBattle {
    clearEnemy(): void
    setEnemy(creature: ICreature | null): void
    getEnemy(): ICreature | null
}