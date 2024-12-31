import {ActionData} from "../Data/ActionData"

export interface IIOService {
    ioService: any
    getInput(text: string): Promise<ActionData>
    close(): void
}

