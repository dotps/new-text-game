import {IService} from "./IService";
import {Logger} from "../Utils/Logger"
import {InputOutputService} from "./InputOutputService"
import {SaveLoadService} from "./SaveLoadService"
import {ConsoleLogger} from "../Utils/ConsoleLogger"

export class Services {
    container: Map<{ new(...args: any[]): IService }, IService> = new Map()

    constructor() {
        this.register(InputOutputService, new InputOutputService())
        this.register(SaveLoadService, new SaveLoadService())

        const isLogEnable = false
        Logger.init(new ConsoleLogger(isLogEnable))
    }

    register<T extends IService>(serviceClass: new (...args: any[]) => T, service: T): void {
        this.container.set(serviceClass, service)
    }

    get<T extends IService>(serviceClass: new (...args: any[]) => T): T {
        const service = this.container.get(serviceClass)
        if (!service) {
            throw new Error(`Сервис ${serviceClass.name} не найден!`)
        }
        return service as T
    }
}