import {InputData} from "../Data/InputData"
import {IService} from "./IService";

export interface IInputOutputService extends IService {
    ioService: any
    getInput(text: string): Promise<InputData>
    close(): void
    displayText(text?: string): void;
}

