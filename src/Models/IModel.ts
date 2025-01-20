import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation, LocationParams} from "../Data/GameData";
import {IInventory} from "./Inventory/IInventory"
import {ICreature} from "./Enemies/ICreature"
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
    setCurrentEnemy(id: string): void
    getCurrentEnemy(): ICreature | null
    getThing(id: string): IThing | null
    getPlayer(): ICreature
    clearEnemy(): void
    getPreviousLocationId(): string
    setAfterBattleLocationId(afterBattleLocationId: string): void
    getAfterBattleLocationId(): string
}