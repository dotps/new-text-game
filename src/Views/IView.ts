import {ActionData} from "../Data/ActionData"

export interface IView {
    displayText(text: string): void
    update(action: ActionData): void
}