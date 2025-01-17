import {IThing} from "../Models/Things/IThing"

export class GameProgressData {
    // public currentLocationId: string = Locations.START
    public currentLocationId: string = "BRANCH_2_FOREST_GLADE"
    public currentLevelPath: string = "./Data/level.json"
    public things: IThing[] = []
}