import {IThingParams} from "../Models/Things/IThingParams"
import {IThing} from "../Models/Things/IThing"
import {Thing} from "../Models/Things/Thing"

export class ThingFactory {
    static createThing(params: IThingParams): IThing | null {
        return new Thing(params)
    }
}