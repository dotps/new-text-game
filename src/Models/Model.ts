import {IModel} from "./IModel";
import {GameProgressData} from "../Data/GameProgressData";
import {GameData} from "../Data/GameData";
import {IInventory} from "./Inventory/IInventory"
import {Inventory} from "./Inventory/Inventory"
import {ICreature} from "./Creatures/ICreature"
import {Player} from "./Creatures/Player"
import {LocationParams} from "../Data/LocationParams"
import {ILocation} from "../Locations/ILocation"
import {IAction} from "../Actions/IAction"
import {Battle} from "../Battle/Battle"
import {IBattle} from "../Battle/IBattle"
import {Input} from "./Input"
import {IInput} from "./IInput"

export class Model implements IModel {

    private currentState: IState | null = null
    private currentProgressData: GameProgressData
    private currentGameData: GameData
    private currentLocation: ILocation | null = null
    private isGameFinished: boolean = false
    private previousLocationId: string = ""
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
        if (this.currentLocation) this.previousLocationId = this.currentLocation.id
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

    getPreviousLocationId(): string {
        return this.previousLocationId
    }

    getPlayer(): ICreature {
        return this.player
    }

    getCurrentState(): IState | null {
        return this.currentState
    }

    getInventory(): IInventory {
        return this.inventory
    }

}