import {IAction, ILocation} from "../Data/GameData";
import {ICreature} from "../Models/Creatures/ICreature"

export interface IView {
    displayLocation(location: ILocation): void
    displayActions(actions: IAction[]): void
    displayText(text: string): void
    displayEnemy(enemy: ICreature | null): void
}
