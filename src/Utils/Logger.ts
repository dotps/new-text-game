import {ILoggerService} from "./ILoggerService"
import {Services} from "../Services/Services"
import {LoggerService} from "./LoggerService"

export class Logger {
    private static loggerService: ILoggerService;

    public static init(loggerService: LoggerService): void {
        Logger.loggerService = loggerService
    }

    public static log(message: any): void {
        Logger.loggerService.log(message)
    }

    static error(message: any) {
        Logger.loggerService.error(message)
    }
}
