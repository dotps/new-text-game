import {ActionData} from "../Data/ActionData"
import {IService} from "./IService";

export interface IInputOutputService extends IService {
    ioService: any
    getInput(text: string): Promise<ActionData>
    close(): void
    displayText(text?: string): void;
}

