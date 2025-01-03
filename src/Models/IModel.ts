import {ActionData} from "../Data/ActionData"

import {GameProgressData} from "../Data/GameProgressData";
import {GameData, ILocation} from "../Data/GameData";

export interface IModel {
    gameData: GameData;
    currentInput: string
    progressData: GameProgressData
    getStartData(): ActionData
    applyAction(): void
    getCurrentLocation(): ILocation;
}