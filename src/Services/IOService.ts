import {createInterface, Interface} from "node:readline/promises"
import {IIOService} from "./IIOService"
import {ActionData} from "../Data/ActionData"

export class IOService implements IIOService {

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
    }

    close(): void {
        this.ioService.close()
    }
}