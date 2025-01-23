import {IThing} from "../Models/Things/IThing"
import {Locations} from "../Locations/Locations"

export class GameProgressData {
    // public currentLocationId: string = Locations.START
    public currentLocationId: string = "BRANCH_2_FOREST_GLADE"
    public previousLocationId: string = ""
    public currentLevelPath: string = "./Data/level.json"
    public things: IThing[] = []
}