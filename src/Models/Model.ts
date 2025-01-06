import {IModel} from "./IModel";
import {ActionData} from "../Data/ActionData"
import {StateMachine} from "../States/StateMachine"
import {BootstrapState} from "../States/BootstrapState"

import {GameProgressData} from "../Data/GameProgressData";
import {GameData, ILocation} from "../Data/GameData";

export class Model implements IModel {
    public currentInput: string = ""
    public progressData: GameProgressData = new GameProgressData()
    public _gameData: GameData = new GameData()

    public get gameData(): GameData {
        return this._gameData;
    }

    applyAction(): void {
        console.log("applyAction")
        // this.progress.currentLocation.
    }
    setLocation(locationId: string): void {
        // TODO: проверить есть ли locationId в gameData
        this.progressData.currentLocationId = locationId
    }

    getStartData(): ActionData {
        return {text: "Who are you?"}
    }

    // getLocation(id: string = "") {
    //     return  (id === "")
    //         ? this._gameData.locations
    //         : this._gameData.locations
    // }

    getCurrentLocation(): ILocation {
        return this._gameData.getLocation(this.progressData.currentLocationId)
    }

    setGameData(gameData: GameData) {
        this._gameData = gameData
        this._gameData.initCommands()
    }

}