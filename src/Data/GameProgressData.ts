import {IThing} from "../Models/Things/IThing"

export class GameProgressData {
    // public currentLocationId: string = Locations.START
    public currentLocationId: string = "branch-2-forest-glade"
    public currentLevelPath: string = "./Data/level-2.json"
    public things: IThing[] = []
}