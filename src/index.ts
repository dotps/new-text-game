import {GameController} from "./Controllers/GameController"
import {View} from "./Views/View";
import {Model} from "./Models/Model";
import {InputOutputService} from "./Services/InputOutputService"
import {StateMachine} from "./States/StateMachine"
import {Services} from "./Services/Services"

const services = new Services()
const gameModel = new Model()
const gameView = new View(services.get(InputOutputService))
const stateMachine = new StateMachine(gameModel, gameView, services)
const game = new GameController(gameModel, gameView, stateMachine, services)

game.run()