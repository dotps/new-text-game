import {GameProgressData} from "../Data/GameProgressData";
import {GameData, IAction, ILocation, LocationParams} from "../Data/GameData";

export interface IModel {
    gameData: GameData
    currentInput: string
    progressData: GameProgressData
    getCurrentLocation(): ILocation
    getCurrentActions(): IAction[]

    setLocation(params: LocationParams): void
    setGameData(gameData: GameData): void
    resetCurrentInput(): void
    gameOver(): void
    isGameOver(): boolean
}