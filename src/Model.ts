import {IModel} from "./IModel";
import {ActionData} from "./ActionData"

export class Model implements IModel {
    getStartData(): ActionData {
        return {text: "Who are you?"}
    }
}