import {ISaveLoadService} from "./ISaveLoadService"

export class SaveLoadService implements ISaveLoadService {
    save(): void {

    }

    load(): GameProgressData | null {
        return null
    }
}

export type GameProgressData = {

}