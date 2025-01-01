import {IService} from "./IService";

export class Services {
    container: Map<{ new(...args: any[]): IService }, IService> = new Map()

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