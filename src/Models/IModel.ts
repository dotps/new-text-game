import {ActionData} from "../Data/ActionData"
import {GameProgressData} from "../States/SaveLoadService"

export interface IModel {
    progress: GameProgressData
    getStartData(): ActionData
}