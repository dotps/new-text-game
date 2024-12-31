import {GameController} from "./Controllers/GameController"
import {IController} from "./Controllers/IController"
import {IView} from "./Views/IView";
import {View} from "./Views/View";
import {IModel} from "./Models/IModel";
import {Model} from "./Models/Model";
import {IOService} from "./Services/IOService"
import {IIOService} from "./Services/IIOService"
import {StateMachine} from "./States/StateMachine"
import {StartGameState} from "./States/StartGameState"
import {ActionState} from "./States/ActionState"

const gameModel: IModel = new Model()
const gameView: IView = new View()
const stateMachine = new StateMachine(gameModel)
const ioService: IIOService = new IOService()
const game: IController = new GameController(gameModel, gameView, stateMachine, ioService)

game.run()