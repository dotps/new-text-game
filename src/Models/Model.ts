import {IModel} from "./IModel";

import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation, LocationParams} from "../Data/GameData";

export class Model implements IModel {
    public currentInput: string = ""
    private _progressData: GameProgressData
    private _gameData: GameData
    private _currentLocation: ILocation | null = null
    private _isGameOver: boolean = false

    constructor() {
        this._progressData = new GameProgressData()
        this._gameData = new GameData()
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
        // TODO: реализовать конец игры
    }

}