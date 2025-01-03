import {ILoggerService} from "./ILoggerService"
import {Services} from "../Services/Services"
import {LoggerService} from "./LoggerService"

export class Logger {
    private static _logger: ILoggerService;

    public static init(loggerService: ILoggerService): void {
        Logger._logger = loggerService
    }

    public static log(message: any): void {
        Logger._logger.log(message);
    }
}
