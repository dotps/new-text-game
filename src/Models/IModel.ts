import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation, LocationParams} from "../Data/GameData";
import {IInventory} from "./Inventory/IInventory"
import {IEnemy} from "./Enemies/IEnemy"
import {IThing} from "./Things/IThing"

export interface IModel {
    inventory: IInventory
    gameData: GameData
    currentInput: string
    progressData: GameProgressData

    getCurrentLocation(): ILocation

    getCurrentActions(): IAction[]

    getLocationParams(id: string): LocationParams

    setCurrentLocation(params: LocationParams): void

    setGameData(gameData: GameData): void

    resetCurrentInput(): void

    gameOver(): void

    isGameOver(): boolean

    // getEnemy(id: string): IEnemy | null
    // takeThing(thing: IThing): void
    setCurrentEnemy(id: string): void

    getCurrentEnemy(): IEnemy | null

    getThing(id: string): IThing | null

    getPlayer(): IEnemy
}