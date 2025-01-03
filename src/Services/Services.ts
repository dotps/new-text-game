import {IService} from "./IService";
import {Logger} from "../Utils/Logger"
import {IOService} from "./IOService"
import {SaveLoadService} from "./SaveLoadService"
import {LoggerService} from "../Utils/LoggerService"
import {ConsoleLogger} from "../Utils/ConsoleLogger"

export class Services {
    container: Map<{ new(...args: any[]): IService }, IService> = new Map()

    constructor() {
        this.register(IOService, new IOService())
        this.register(SaveLoadService, new SaveLoadService())
        this.register(LoggerService, new LoggerService(new ConsoleLogger(false)))
        Logger.init(this.get(LoggerService))
    }

    register<T extends IService>(serviceClass: new (...args: any[]) => T, service: T): void {
        this.container.set(serviceClass, service);
    }

    get<T extends IService>(serviceClass: new (...args: any[]) => T): T {
        const service = this.container.get(serviceClass);
        if (!service) {
            throw new Error(`Service ${serviceClass.name} not found!`);
        }
        return service as T;
    }
}