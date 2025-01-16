import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation, IThing, LocationParams} from "../Data/GameData";
import {IInventory} from "./Inventory/IInventory"
import {IEnemy} from "./Enemies/IEnemy"

export interface IModel {
    inventory: IInventory
    gameData: GameData
    currentInput: string
    progressData: GameProgressData
    getCurrentLocation(): ILocation
    getCurrentActions(): IAction[]

    setLocation(params: LocationParams): void
    setGameData(gameData: GameData): void
    resetCurrentInput(): void
    gameOver(): void
    isGameOver(): boolean
    // getEnemy(id: string): IEnemy | null
    // takeThing(thing: IThing): void
    setCurrentEnemy(enemyId: string): void
    getCurrentEnemy(): IEnemy | null
}