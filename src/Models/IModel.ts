import {GameProgressData} from "../Data/GameProgressData";
import {GameData} from "../Data/GameData";
import {ICreature} from "./Creatures/ICreature"
import {IThing} from "./Things/IThing"
import {LocationParams} from "../Data/LocationParams"
import {ILocation} from "../Locations/ILocation"
import {IAction} from "../Actions/IAction"
import {IInventory} from "./Inventory/IInventory"
import {Enemy} from "./Creatures/Enemies/Enemy"

export interface IModel {
    gameData: GameData
    currentInput: string
    progressData: GameProgressData

    getCurrentLocation(): ILocation
    getCurrentActions(): IAction[]
    setCurrentLocation(id: string, params?: LocationParams): void
    setGameData(gameData: GameData): void
    resetCurrentInput(): void
    gameOver(): void
    isGameOver(): boolean
    // setCurrentEnemy(id: string): void
    // getCurrentEnemy(): ICreature | null
    getThing(id: string): IThing | null
    getPlayer(): ICreature
    // clearEnemy(): void
    getPreviousLocationId(): string
    setAfterBattleLocationId(afterBattleLocationId: string): void
    getAfterBattleLocationId(): string
    getCurrentState(): IState | null
    getInventory(): IInventory
    getEnemy(): Enemy
}