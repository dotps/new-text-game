import {ICreature} from "../Models/Creatures/ICreature"
import {ILocation} from "../Locations/ILocation"
import {IAction} from "../Actions/IAction"

export interface IView {
    displayLocation(location: ILocation): void
    displayActions(actions: IAction[]): void
    displayText(text: string): void
    displayEnemy(enemy: ICreature | null): void
}
