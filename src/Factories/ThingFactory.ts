import {Wolf} from "../Models/Enemies/Wolf"
import {IThingParams} from "../Models/Things/IThingParams"
import {IThing} from "../Models/Things/IThing"
import {Thing} from "../Models/Things/Thing"

export class ThingFactory {
    static createThing(params: IThingParams): IThing | null {


        return new Thing(params)

        // switch (params.id) {
        //     case "paper":
        //         return new Thing(params)
        //
        //     default:
        //         return null
        // }
    }
}