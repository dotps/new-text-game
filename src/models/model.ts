import {IModel} from "./model.interface"
import {IState} from "../states/state.interface"
import {GameProgressData} from "../data/game-progress.data"
import {GameData} from "../data/game.data"
import {ILocation} from "../locations/location.interface"
import {IInventory} from "./Inventory/inventory.interface"
import {ICreature} from "./Creatures/creature.interface"
import {IInput} from "./input.interface"
import {IBattle} from "../battle/battle.interface"
import {Inventory} from "./Inventory/inventory"
import {Player} from "./Creatures/player"
import {Battle} from "../battle/battle"
import {Input} from "./input"
import {LocationParams} from "../data/location-params"
import {IAction} from "../actions/action.interface"

export class Model implements IModel {
    private currentState: IState | null = null
    private currentProgressData: GameProgressData
    private currentGameData: GameData
    private currentLocation: ILocation | null = null
    private isGameFinished: boolean = false
    private readonly inventory: IInventory
    private readonly player: ICreature
    private readonly input: IInput
    private battle: IBattle

    constructor() {
        this.currentProgressData = new GameProgressData()
        this.currentGameData = new GameData()
        this.inventory = new Inventory(this.currentProgressData.things)
        this.player = new Player()
        this.battle = new Battle()
        this.input = new Input()
    }

    get gameData(): GameData {
        return this.currentGameData
    }

    get progressData(): GameProgressData {
        return this.currentProgressData
    }

    set progressData(progressData: GameProgressData) {
        this.currentProgressData = progressData
    }

    getInput(): IInput {
        return this.input
    }

    setCurrentLocation(id: string, params?: LocationParams): void {
        if (this.currentLocation) this.currentProgressData.previousLocationId = this.currentLocation.id
        this.currentLocation = this.currentGameData.getLocation(id)
        if (params) this.currentLocation.setParams(params)
        this.currentProgressData.currentLocationId = id
    }

    getCurrentLocation(): ILocation {
        if (!this.currentLocation) {
            this.currentLocation = this.currentGameData.getLocation(this.currentProgressData.currentLocationId)
        }
        return this.currentLocation
    }

    getCurrentActions(): IAction[] {
        return this.currentLocation?.actions || []
    }

    setGameData(gameData: GameData) {
        this.currentGameData = gameData
    }

    isGameOver(): boolean {
        if (this.player.health <= 0) this.isGameFinished = true
        return this.isGameFinished
    }

    getBattle(): IBattle {
        return this.battle
    }

    setBattle(battle: IBattle | null): void {
        if (!battle) battle = new Battle()
        this.battle = battle
    }

    getPlayer(): ICreature {
        return this.player
    }

    getCurrentState(): IState | null {
        return this.currentState
    }

    setCurrentState(state: IState): void {
        this.currentState = state
    }

    getInventory(): IInventory {
        return this.inventory
    }
}