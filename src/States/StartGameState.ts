import {InputState} from "./InputState";
import {StateMachine} from "./StateMachine";
import {IModel} from "../Models/IModel";
import {IView} from "../Views/IView";

export class StartGameState implements IState {
    private _stateMachine: StateMachine;
    private _model: IModel;
    private _view: IView;

    constructor(stateMachine: StateMachine, model: IModel, view: IView) {
        this._stateMachine = stateMachine
        this._model = model
        this._view = view;
    }
    
    enter(): void {
        console.log("enter " + this.constructor.name)
        const location = this._model.getCurrentLocation()
        this._view.displayLocation(location)
        this._stateMachine.enter(InputState)
    }
    exit(): void {
        console.log("exit " + this.constructor.name)
    }
}