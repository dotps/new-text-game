import {ActionData} from "../Data/ActionData"
import {GameProgressData} from "../Services/SaveLoadService"

export interface IModel {
    progress: GameProgressData
    getStartData(): ActionData
}