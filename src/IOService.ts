import {createInterface, Interface} from "node:readline/promises"
import {IIOService} from "./IIOService"
import {ActionData} from "./ActionData"

export class IOService implements IIOService {

    private _ioService: any

    constructor() {
        this._ioService = createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    async getInput(text: string): Promise<ActionData> {
        const inputData: string = await this._ioService.question(text)
        return {text: `Hello ${inputData}!`, inputData: inputData}
    }

    close(): void {
        this._ioService.close()
    }
}