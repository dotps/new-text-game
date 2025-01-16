import {IAction, ILocation} from "../Data/GameData";
import {IEnemy} from "../Models/Enemies/IEnemy"

export interface IView {
    displayLocation(location: ILocation): void
    displayActions(actions: IAction[]): void
    displayText(text: string): void
    displayEnemy(enemy: IEnemy | null): void
}
