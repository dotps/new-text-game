import {IModel} from "./IModel";
import {ActionData} from "./ActionData"
import {StateMachine} from "./States/StateMachine"
import {BootstrapState} from "./States/BootstrapState"
import {GameProgressData} from "./States/SaveLoadService";

export class Model implements IModel {

    public progress: GameProgressData = {
        currentLocation: ""
    }
    // progress - состояние игры

    constructor() {

    }

    getStartData(): ActionData {
        return {text: "Who are you?"}
    }
}