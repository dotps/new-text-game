import {IAction, ILocation} from "../Data/GameData";

export interface IView {
    displayLocation(location: ILocation): void
    displayActions(actions: IAction[]): void
    displayText(text: string): void
}
