import {GameController} from "./Controllers/GameController"
import {IController} from "./Controllers/IController"
import {IView} from "./Views/IView";
import {View} from "./Views/View";
import {IModel} from "./Models/IModel";
import {Model} from "./Models/Model";
import {IOService} from "./Services/IOService"
import {StateMachine} from "./States/StateMachine"
import {Services} from "./Services/Services";

const gameModel: IModel = new Model()
const gameView: IView = new View()
const services = new Services()
const stateMachine = new StateMachine(gameModel, services)
const ioService = services.get(IOService);
const game: IController = new GameController(gameModel, gameView, stateMachine, ioService)

game.run()