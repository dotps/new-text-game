import {ICreature} from "../ICreature"
import {GameData} from "../../../Data/GameData"

export class Enemy {
    private enemy: ICreature | null = null
    private gameData: GameData

    constructor(gameData: GameData) {
        this.gameData = gameData
    }

    clearEnemy(): void {
        this.enemy = null
    }

    setCurrentEnemy(id: string): void {
        this.enemy = this.gameData.getEnemy(id)
    }

    getCurrentEnemy(): ICreature | null {
        return this.enemy
    }
}