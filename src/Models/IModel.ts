import {GameProgressData} from "../Data/GameProgressData";
import {GameData} from "../Data/GameData";
import {ICreature} from "./Creatures/ICreature"
import {LocationParams} from "../Data/LocationParams"
import {ILocation} from "../Locations/ILocation"
import {IAction} from "../Actions/IAction"
import {IInventory} from "./Inventory/IInventory"
import {IBattle} from "../Battle/IBattle"
import {IInput} from "./IInput"
import {IState} from "../States/IState"

export interface IModel {
    gameData: GameData
    progressData: GameProgressData
    getInput(): IInput
    getCurrentLocation(): ILocation
    getCurrentActions(): IAction[]
    setCurrentLocation(id: string, params?: LocationParams): void
    setGameData(gameData: GameData): void
    isGameOver(): boolean
    getPlayer(): ICreature
    getCurrentState(): IState | null
    getInventory(): IInventory
    getBattle(): IBattle
    setBattle(battle: IBattle | null): void
    setCurrentState(state: IState): void
}