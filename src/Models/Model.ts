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

    private _progressData: GameProgressData
    private _gameData: GameData
    private _currentLocation: ILocation | null = null
    private _previousLocationId: string = ""
    private _isGameOver: boolean = false
    private currentEnemy: ICreature | null = null
    private readonly player: Player
    private afterBattleLocationId: string = ""

    constructor() {
        this._progressData = new GameProgressData()
        this._gameData = new GameData()
        this.inventory = new Inventory(this._progressData.things)
        this.player = new Player({health: 1})
    }

    clearEnemy(): void {
        this.currentEnemy = null
    }

    public get gameData(): GameData {
        return this._gameData
    }
    public get progressData(): GameProgressData {
        return this._progressData
    }

    public set progressData(progressData: GameProgressData) {
        this._progressData = progressData
    }

    resetCurrentInput(): void {
        this.currentInput = ""
    }

    setCurrentLocation(params: LocationParams): void {
        if (this._currentLocation) this._previousLocationId = this._currentLocation.id

        this._currentLocation = this._gameData.getLocation(params)
        this._progressData.currentLocationId = params.locationId

        if (params.isGameOver) this.gameOver()
    }

    getCurrentLocation(): ILocation {
        if (!this._currentLocation) {
            const locationParams = new LocationParams({locationId: this.progressData.currentLocationId})
            this._currentLocation = this._gameData.getLocation(locationParams)
        }
        return this._currentLocation
    }

    getCurrentActions(): IAction[] {
        return this._currentLocation?.actions || []
    }

    setGameData(gameData: GameData) {
        this._gameData = gameData
        this._gameData.initCommands()
    }

    gameOver(): void {
        this._isGameOver = true
        this.player.health = 0
    }

    public isGameOver(): boolean {
        if (this.player.health <= 0) this._isGameOver = true
        return this._isGameOver
    }

    setCurrentEnemy(id: string): void {
        this.currentEnemy = this._gameData.getEnemy(id)
    }

    getCurrentEnemy(): ICreature | null {
        return this.currentEnemy
    }

    getThing(id: string): IThing | null {
        return this._gameData.getThing(id)
    }

    getLocationParams(id: string): LocationParams {
        return new LocationParams({locationId: id})
    }

    getPreviousLocationId(): string {
        return this._previousLocationId
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

}