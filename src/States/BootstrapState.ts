import {StateMachine} from "./StateMachine"
import {LoadProgressState} from "./LoadProgressState"
import {SaveLoadService} from "../Services/SaveLoadService";
import {InputOutputService} from "../Services/InputOutputService";
import {Services} from "../Services/Services";
import {Logger} from "../Utils/Logger"

export class BootstrapState implements IState {

    private _stateMachine: StateMachine
    private _services: Services;

    constructor(stateMachine: StateMachine, services: Services) {
        this._stateMachine = stateMachine
        this._services = services

        this.initServices()
    }

    private initServices() {
        this._services.register(SaveLoadService, new SaveLoadService())
        // this._services.register(IOService, new IOService())
    }

    public enter(): void {
        Logger.log("enter " + this.constructor.name)
        this._stateMachine.enter(LoadProgressState)
    }

    public exit(): void {
        Logger.log("exit " +  + this.constructor.name)
    }
}