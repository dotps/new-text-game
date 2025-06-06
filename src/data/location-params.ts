import {IActionParams} from "./action-params.interface"
import {Locations} from "../locations/locations"

export class LocationParams {
    locationId: string
    locationDescription: string

    constructor(params: IActionParams = {}) {
        this.locationId = params?.locationId?.toString() || Locations.Start
        this.locationDescription = params?.locationDescription?.toString()
    }
}