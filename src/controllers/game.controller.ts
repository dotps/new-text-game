import {IController} from "./controller.interface"
import {IStateMachine} from "../states/state-machine.interface"
import {IModel} from "../models/model.interface"
import {IView} from "../views/view.interface"
import {StateMachine} from "../states/state-machine"
import {LoadProgressState} from "../states/load-progress.state"
import {Services} from "../services/services"

export class GameController implements IController {

    private stateMachine: IStateMachine

    constructor(model: IModel, view: IView, services: Services) {
        this.stateMachine = new StateMachine(model, view, services)
    }

    public run() {
        this.stateMachine.enter(LoadProgressState)
    }
}

