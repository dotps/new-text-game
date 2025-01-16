import {IController} from "./IController"
import {IModel} from "../Models/IModel"
import {IView} from "../Views/IView"
import {Services} from "../Services/Services";
import {LoadProgressState} from "../States/LoadProgressState";
import {IStateMachine} from "../States/IStateMachine"

export class GameController implements IController {

    private model: IModel
    private view: IView
    private stateMachine: IStateMachine;
    private services: Services;

    constructor(model: IModel, view: IView, stateMachine: IStateMachine, services: Services) {
        this.model = model
        this.view = view
        this.stateMachine = stateMachine
        this.services = services
    }

    public run() {
        this.stateMachine.enter(LoadProgressState)
    }
}

