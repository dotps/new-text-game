import {GameController} from "./Controllers/GameController"
import {IController} from "./Controllers/IController"
import {IView} from "./Views/IView";
import {View} from "./Views/View";
import {IModel} from "./Models/IModel";
import {Model} from "./Models/Model";
import {IOService} from "./Services/IOService"
import {StateMachine} from "./States/StateMachine"
import {Services} from "./Services/Services";
import {SaveLoadService} from "./Services/SaveLoadService";

const gameModel: IModel = new Model()

const services = new Services()
services.register(IOService, new IOService())
services.register(SaveLoadService, new SaveLoadService())

const gameView: IView = new View(services.get(IOService))
// const gameView: IView = new View(new IOService())
const stateMachine = new StateMachine(gameModel, gameView, services)
const game: IController = new GameController(gameModel, gameView, stateMachine, services)

game.run()