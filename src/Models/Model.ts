import {IModel} from "./IModel";

import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation} from "../Data/GameData";

export class Model implements IModel {
    public currentInput: string = ""
    private _progressData: GameProgressData
    private _gameData: GameData
    private _currentLocation: ILocation | null = null
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

    setLocation(locationId: string): void {
        this._currentLocation = this._gameData.getLocation(locationId)
        this._progressData.currentLocationId = locationId
    }

    getCurrentLocation(): ILocation {
        if (!this._currentLocation) {
            this._currentLocation = this._gameData.getLocation(this.progressData.currentLocationId)
        }
        return this._currentLocation
    }

    getCurrentActions(): IAction[] {
        return this._currentLocation?.actions || []
    }

    getCurrentAction(input: number): IAction {
        const index: number = input - 1
        const action = this._currentLocation?.actions[index]
        if (action) {
            return action
        }
        else {
            throw Error(`Action input=${input}, index=${index} not found!`)
        }
    }

    setGameData(gameData: GameData) {
        this._gameData = gameData
        this._gameData.initCommands()
    }
}