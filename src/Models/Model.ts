import {IModel} from "./IModel";
import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation, LocationParams} from "../Data/GameData";
import {IInventory} from "./Inventory/IInventory"
import {Inventory} from "./Inventory/Inventory"
import {ICreature} from "./Enemies/ICreature"
import {IThing} from "./Things/IThing"
import {Player} from "./Enemies/Player"

export class Model implements IModel {


    currentInput: string = ""
    inventory: IInventory

    private currentState: IState | null = null
    private currentProgressData: GameProgressData
    private currentGameData: GameData
    private currentLocation: ILocation | null = null
    private isGameFinished: boolean = false
    private currentEnemy: ICreature | null = null
    private player: Player
    private previousLocationId: string = ""
    private afterBattleLocationId: string = ""

    constructor() {
        this.currentProgressData = new GameProgressData()
        this.currentGameData = new GameData()
        this.inventory = new Inventory(this.currentProgressData.things)
        this.player = new Player({health: 1})
    }

    clearEnemy(): void {
        this.currentEnemy = null
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

    resetCurrentInput(): void {
        this.currentInput = ""
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
        this.currentGameData.initCommands()
    }

    gameOver(): void {
        this.isGameFinished = true
    }

    public isGameOver(): boolean {
        if (this.player.health <= 0) this.isGameFinished = true
        return this.isGameFinished
    }

    setCurrentEnemy(id: string): void {
        this.currentEnemy = this.currentGameData.getEnemy(id)
    }

    getCurrentEnemy(): ICreature | null {
        return this.currentEnemy
    }


    getThing(id: string): IThing | null {
        return this.currentGameData.getThing(id)
    }

    // getLocationParams(id: string): LocationParams {
    //     return new LocationParams({locationId: id})
    // }

    getPreviousLocationId(): string {
        return this.previousLocationId
    }

    getPlayer(): ICreature {
        return this.player
    }

    getAfterBattleLocationId(): string {
        return this.afterBattleLocationId
    }

    setAfterBattleLocationId(afterBattleLocationId: string): void {
        this.afterBattleLocationId = afterBattleLocationId
    }

    getCurrentState(): IState | null {
        return this.currentState
    }

}