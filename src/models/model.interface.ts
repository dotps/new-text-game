import {GameProgressData} from "../data/game-progress.data"
import {GameData} from "../data/game.data"
import {IInput} from "./input.interface"
import {ILocation} from "../locations/location.interface"
import {IAction} from "../actions/action.interface"
import {LocationParams} from "../data/location-params"
import {ICreature} from "./Creatures/creature.interface"
import {IState} from "../states/state.interface"
import {IInventory} from "./Inventory/inventory.interface"
import {IBattle} from "../battle/battle.interface"

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