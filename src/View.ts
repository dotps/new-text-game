import {IView} from "./IView";

export class View implements IView {
    displayText(text: string): void {
        console.log(text)
    }
    getInput(): void {

    }
}