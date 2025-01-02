import {InputState} from "./InputState";
import {StateMachine} from "./StateMachine";
import {IModel} from "../Models/IModel";

export class StartGameState implements IState {
    private _stateMachine: StateMachine;
    private _model: IModel;

    constructor(stateMachine: StateMachine, model: IModel) {
        this._stateMachine = stateMachine
        this._model = model
    }
    
    enter(): void {
        console.log("enter " + this.constructor.name)
        // TODO: отоброзить экран первой локации view.displayLocation + view.displayActions
        // сделать интерфейс IViewable с методом updateView
        this._stateMachine.enter(InputState)
    }
    exit(): void {
        console.log("exit " + this.constructor.name)
    }
}