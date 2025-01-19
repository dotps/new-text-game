import {IView} from "../Views/IView"
import {Logger} from "../Utils/Logger"
import {IStateMachine} from "./IStateMachine"
import {ExitState} from "./ExitState"
import {Locations} from "../Data/Locations"
import {LocationState} from "./LocationState"
import {IModel} from "../Models/IModel"

export class GameOverState implements IState {
    private view: IView
    private stateMachine: IStateMachine
    private model: IModel
    private readonly gameOverText: string = "Конец игры"

    constructor(stateMachine: IStateMachine, view: IView, model: IModel) {
        this.model = model
        this.stateMachine = stateMachine
        this.view = view
    }
    
    enter(): void {
        // this.view.displayText(this.gameOverText)
        // this.stateMachine.enter(ExitState)
        let locationParams = this.model.getLocationParams(Locations.GAME_OVER)
        this.model.setCurrentLocation(locationParams)
        this.stateMachine.enter(LocationState)
        // TODO: запутался со состоянием game over,
    }

    exit(): void {}
}