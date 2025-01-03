import {ActionData} from "../Data/ActionData"
import {IAction, ILocation} from "../Data/GameData";

export interface IView {
    // displayText(text: string): void
    update(action: ActionData): void
    displayLocation(location: ILocation): void
    displayActions(actions: IAction[]): void
}
