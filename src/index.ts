import {GameController} from "./Controllers/GameController"
import {IController} from "./Controllers/IController"
import {IView} from "./Views/IView";
import {View} from "./Views/View";
import {IModel} from "./Models/IModel";
import {Model} from "./Models/Model";
import {InputOutputService} from "./Services/InputOutputService"
import {StateMachine} from "./States/StateMachine"
import {Services} from "./Services/Services"

const services = new Services()
const gameModel: IModel = new Model()
const gameView: IView = new View(services.get(InputOutputService))
const stateMachine = new StateMachine(gameModel, gameView, services)
const game: IController = new GameController(gameModel, gameView, stateMachine, services)

game.run()