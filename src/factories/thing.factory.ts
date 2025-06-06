import {IThingParams} from "../models/Things/thing-params.interface"
import {IThing} from "../models/Things/thing.interface"
import {Thing} from "../models/Things/thing"

export class ThingFactory {
    static createThing(params: IThingParams): IThing | null {
        return new Thing(params)
    }
}