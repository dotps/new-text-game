import {GameController} from "./GameController"
import {IController} from "./IController"
import {IView} from "./IView";
import {View} from "./View";
import {IModel} from "./IModel";
import {Model} from "./Model";
import {IOService} from "./IOService"
import {IIOService} from "./IIOService"
import {StateMachine} from "./StateMachine"
import {StartGameState} from "./StartGameState"
import {ActionState} from "./ActionState"

const gameModel: IModel = new Model()
const gameView: IView = new View()
const ioService: IIOService = new IOService()
const gameController: IController = new GameController(gameModel, gameView, ioService)

const stateMachine = new StateMachine();
stateMachine.enter(StartGameState);
stateMachine.enter(ActionState);

gameController.run()