import {createInterface, Interface} from "node:readline/promises"
import {IInputOutputService} from "./input-output.interface"
import {InputData} from "../data/input.data"

export class InputOutputService implements IInputOutputService {

    ioService: Interface

    constructor() {
        this.ioService = createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    async getInput(text: string): Promise<InputData> {
        const inputData: string = await this.ioService.question(text)
        return {data: inputData}
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