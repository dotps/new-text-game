import {GameController} from "./controllers/game.controller"
import {Services} from "./services/services"
import {Model} from "./models/model"
import {View} from "./views/view"
import {InputOutputService} from "./services/input-output.service"

const services = new Services()
const model = new Model()
const view = new View(services.get(InputOutputService))
const game = new GameController(model, view, services)

game.run()