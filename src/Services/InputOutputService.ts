import {createInterface, Interface} from "node:readline/promises"
import {IInputOutputService} from "./IInputOutputService"
import {ActionData} from "../Data/ActionData"

export class InputOutputService implements IInputOutputService {

    ioService: Interface

    constructor() {
        this.ioService = createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    async getInput(text: string): Promise<ActionData> {
        const inputData: string = await this.ioService.question(text)
        return {text: `Hello ${inputData}!`, inputData: inputData}
        // TODO: Перейти на InputData
    }

    close(): void {
        this.ioService.close()
    }

    displayText(text?: string): void {
        if (!text)
            return
        console.log(text)
    }
}