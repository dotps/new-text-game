import {GameController} from "./Controllers/GameController"
import {View} from "./Views/View";
import {Model} from "./Models/Model";
import {InputOutputService} from "./Services/InputOutputService"
import {Services} from "./Services/Services"

const services = new Services()
const model = new Model()
const view = new View(services.get(InputOutputService))
const game = new GameController(model, view, services)

game.run()