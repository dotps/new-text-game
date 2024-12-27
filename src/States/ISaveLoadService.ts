import {GameProgressData} from "./SaveLoadService"

export interface ISaveLoadService {
    save(): void

    load(): GameProgressData | null
}