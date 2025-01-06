import {ActionData} from "../Data/ActionData"

import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation} from "../Data/GameData";

export interface IModel {
    gameData: GameData
    currentInput: string
    progressData: GameProgressData
    getCurrentLocation(): ILocation
    getCurrentActions(): IAction[]
    setLocation(locationId: string): void
    setGameData(gameData: GameData): void

    getCurrentAction(input: number): IAction
}