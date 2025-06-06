import {InputData} from "../data/input.data"
import {IService} from "./service.interface"

export interface IInputOutputService extends IService {
    ioService: any
    getInput(text: string): Promise<InputData>
    close(): void
    displayText(text?: string): void;
}

