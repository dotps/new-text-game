import {GameController} from "./GameController"
import {IController} from "./IController"
import {IView} from "./IView";
import {View} from "./View";
import {IModel} from "./IModel";
import {Model} from "./Model";
import {IOService} from "./IOService"
import {IIOService} from "./IIOService"
import {StateMachine} from "./States/StateMachine"
import {StartGameState} from "./States/StartGameState"
import {ActionState} from "./States/ActionState"

const gameModel: IModel = new Model()
const gameView: IView = new View()
const ioService: IIOService = new IOService()
const game: IController = new GameController(gameModel, gameView, ioService)

game.run()