import {ActionData} from "../Data/ActionData"

import {GameProgressData} from "../Data/GameProgressData";
import {GameData} from "../Data/GameData";

export interface IModel {
    gameData: GameData;
    currentInput: string
    progressData: GameProgressData
    getStartData(): ActionData
    applyAction(): void
}