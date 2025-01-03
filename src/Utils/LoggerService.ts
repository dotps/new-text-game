import {ILoggerService} from "./ILoggerService";

export class LoggerService {

    private _logger: ILoggerService;

    constructor(logger: ILoggerService) {
        this._logger = logger;
    }

    log(text: string): void {
        this._logger.log(text)
    }
}