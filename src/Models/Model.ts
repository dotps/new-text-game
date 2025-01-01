import {IModel} from "./IModel";
import {ActionData} from "../Data/ActionData"
import {StateMachine} from "../States/StateMachine"
import {BootstrapState} from "../States/BootstrapState"
import {GameProgressData} from "../Services/SaveLoadService";

export class Model implements IModel {

    public progress: GameProgressData = {
        currentLocation: ""
    }

    public currentInput: string = ""
    // progress - состояние игры

    constructor() {

    }

    getStartData(): ActionData {
        return {text: "Who are you?"}
    }
}