import {ActionData} from "./ActionData"

export interface IIOService {
    ioService: any
    getInput(text: string): Promise<ActionData>
    close(): void
}

