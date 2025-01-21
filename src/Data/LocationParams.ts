import {Locations} from "./Locations"
import {IActionParams} from "./IActionParams"

export class LocationParams {
    locationId: string
    locationDescription: string

    constructor(params: IActionParams = {}) {
        this.locationId = params?.locationId?.toString() || Locations.START
        this.locationDescription = params?.locationDescription?.toString()
    }
}