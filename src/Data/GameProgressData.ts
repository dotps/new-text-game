import {IThing} from "./GameData"

export class GameProgressData {
    public currentLocationId: string = "start"
    public currentLevelPath: string = "./Data/level-2.json"
    public things: IThing[] = []
}