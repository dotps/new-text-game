import {IView} from "./IView";
import {ActionData} from "./ActionData"

export class View implements IView {
    update(action: ActionData): void {
        this.displayText(action.text)
        this.displayText(action.elements)
    }
    displayText(text?: string): void {
        if (!text)
            return
        console.log(text)
    }
}