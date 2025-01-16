import {IModel} from "./IModel";

import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation, IThing, LocationParams} from "../Data/GameData";
import {IInventory} from "./Inventory/IInventory"
import {Inventory} from "./Inventory/Inventory"
import {IEnemy} from "./Enemies/IEnemy"

export class Model implements IModel {

    currentInput: string = ""
    inventory: IInventory
    private _progressData: GameProgressData
    private _gameData: GameData
    private _currentLocation: ILocation | null = null
    private _isGameOver: boolean = false
    private currentEnemy: IEnemy | null = null

    constructor() {
        this._progressData = new GameProgressData()
        this._gameData = new GameData()
        this.inventory = new Inventory(this._progressData.things)
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

    setLocation(params: LocationParams): void {
        this._currentLocation = this._gameData.getLocation(params)
        this._progressData.currentLocationId = params.locationId

        if (params.isGameOver)
            this.gameOver()
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
    }

    public isGameOver(): boolean {
        return this._isGameOver
    }

    // takeThing(thing: IThing): void {
    //     // this._progressData.inventory.push(thing)
    //     // console.log(this._progressData.inventory)
    // }

    // getEnemy(id: string): IEnemy | null {
    //     return this._gameData.getEnemy(id)
    // }

    setCurrentEnemy(enemyId: string): void {
        this.currentEnemy = this._gameData.getEnemy(enemyId)
    }

    getCurrentEnemy(): IEnemy | null {
        return this.currentEnemy
    }
}