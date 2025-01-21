import {ICreature} from "../Models/Creatures/ICreature"
import {ILocation} from "../Data/ILocation"
import {IAction} from "../Data/IAction"

export interface IView {
    displayLocation(location: ILocation): void
    displayActions(actions: IAction[]): void
    displayText(text: string): void
    displayEnemy(enemy: ICreature | null): void
}
