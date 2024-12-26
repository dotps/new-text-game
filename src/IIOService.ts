import {ActionData} from "./ActionData"

export interface IIOService {
    getInput(text: string): Promise<ActionData>
    close(): void
}

