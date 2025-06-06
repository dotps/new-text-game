import {InputOutputService} from "./input-output.service"
import {IService} from "./service.interface"
import {SaveLoadService} from "./save-load.service"
import {ConsoleLogger} from "../utils/console-logger"
import {Logger} from "../utils/logger"

export class Services {
    container: Map<ServiceClassType, IService> = new Map()

    constructor() {
        this.register(InputOutputService, new InputOutputService())
        this.register(SaveLoadService, new SaveLoadService())

        const isLogEnable = false
        Logger.init(new ConsoleLogger(isLogEnable))
    }

    register<T extends IService>(serviceClass: ServiceClassType, service: T): void {
        this.container.set(serviceClass, service)
    }

    get<T extends IService>(serviceClass: ServiceClassType): T {
        const service = this.container.get(serviceClass)
        if (!service) {
            throw new Error(`Сервис ${serviceClass.name} не найден!`)
        }
        return service as T
    }
}

export type ServiceClassType<T extends IService = IService> = new (...args: any[]) => T
