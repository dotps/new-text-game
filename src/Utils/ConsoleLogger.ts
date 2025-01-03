import {ILoggerService} from "./ILoggerService";

export class ConsoleLogger implements ILoggerService {

    private readonly _enabled: boolean

    constructor(enabled: boolean = true) {
        this._enabled = enabled
    }

    log(text: string): void {
        if (!this._enabled) return
        console.log(text)
    }
}