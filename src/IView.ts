import {ActionData} from "./ActionData"

export interface IView {
    displayText(text: string): void
    displayScreen(action: ActionData): void
}