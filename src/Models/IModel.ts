import {GameProgressData} from "../Data/GameProgressData";
import {GameData} from "../Data/GameData";
import {ICreature} from "./Creatures/ICreature"
import {IThing} from "./Things/IThing"
import {LocationParams} from "../Data/LocationParams"
import {ILocation} from "../Locations/ILocation"
import {IAction} from "../Actions/IAction"
import {IInventory} from "./Inventory/IInventory"
import {IBattle} from "../Battle/IBattle"

export interface IModel {
    gameData: GameData
    currentInput: string
    progressData: GameProgressData

    getCurrentLocation(): ILocation
    getCurrentActions(): IAction[]
    setCurrentLocation(id: string, params?: LocationParams): void
    setGameData(gameData: GameData): void
    resetCurrentInput(): void
    isGameOver(): boolean
    getPlayer(): ICreature
    getPreviousLocationId(): string
    getCurrentState(): IState | null
    getInventory(): IInventory
    getBattle(): IBattle
    setBattle(battle: IBattle | null): void
}