import {IController} from "./IController"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Services} from "../Services/Services";
import {LoadProgressState} from "../States/LoadProgressState";
import {IStateMachine} from "../States/IStateMachine"
import {StateMachine} from "../States/StateMachine"

export class GameController implements IController {

    private stateMachine: IStateMachine

    constructor(model: IModel, view: IView, services: Services) {
        this.stateMachine = new StateMachine(model, view, services)
    }

    public run() {
        this.stateMachine.enter(LoadProgressState)
    }
}

