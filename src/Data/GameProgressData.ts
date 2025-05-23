import {IThing} from "../Models/Things/IThing"
import {Locations} from "../Locations/Locations"
import * as path from "path"

export class GameProgressData {
    public currentLocationId: string = Locations.START
    // public currentLocationId: string = "BRANCH_2_FOREST_GLADE"
    public previousLocationId: string = ""
    public currentLevelPath: string = path.join(__dirname, "level.json")
    public things: IThing[] = []
}