import {IModel} from "./IModel";
import {ActionData} from "../Data/ActionData"
import {StateMachine} from "../States/StateMachine"
import {BootstrapState} from "../States/BootstrapState"

import {GameProgressData} from "../Data/GameProgressData";
import {GameData, ILocation} from "../Data/GameData";

export class Model implements IModel {
    public currentInput: string = ""
    public progressData: GameProgressData = new GameProgressData()
    public gameData: GameData = new GameData()

    applyAction(): void {
        console.log("applyAction")
        // this.progress.currentLocation.
    }

    getStartData(): ActionData {
        return {text: "Who are you?"}
    }

    getLocation(id: string = "") {
        return  (id === "")
            ? this.gameData.locations
            : this.gameData.locations
    }

    getCurrentLocation(): ILocation {
        return this.gameData.getLocation(this.progressData.currentLocationId)
    }

}