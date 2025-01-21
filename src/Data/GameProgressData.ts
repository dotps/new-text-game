import {IThing} from "../Models/Things/IThing"
import {Locations} from "../Locations/Locations"

export class GameProgressData {
    public currentLocationId: string = Locations.START
    public currentLevelPath: string = "./Data/level.json"
    public things: IThing[] = []
}