import {ActionData} from "../Data/ActionData"
import {GameProgressData} from "../Services/SaveLoadService"

export interface IModel {
    currentInput: string;
    progress: GameProgressData
    getStartData(): ActionData
}