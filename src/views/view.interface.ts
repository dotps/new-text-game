import {ILocation} from "../locations/location.interface"
import {IAction} from "../actions/action.interface"
import {ICreature} from "../models/Creatures/creature.interface"

export interface IView {
    displayLocation(location: ILocation): void
    displayActions(actions: IAction[]): void
    displayText(text: string): void
    displayEnemy(enemy: ICreature | null): void
}
