import * as path from "path"
import {IThing} from "../models/Things/thing.interface"
import {Locations} from "../locations/locations"

export class GameProgressData {
    public currentLocationId: string = Locations.Start
    // public currentLocationId: string = "BRANCH_2_FOREST_GLADE"
    public previousLocationId: string = ""
    public currentLevelPath: string = path.join(__dirname, "level.json")
    public things: IThing[] = []
}