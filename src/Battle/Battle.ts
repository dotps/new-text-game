import {ICreature} from "../Models/Creatures/ICreature"
import {IBattle} from "./IBattle"

export class Battle implements IBattle {
    private enemy: ICreature | null = null

    clearEnemy(): void {
        this.enemy = null
    }

    setEnemy(creature: ICreature | null): void {
        this.enemy = creature
    }

    getEnemy(): ICreature | null {
        return this.enemy
    }
}