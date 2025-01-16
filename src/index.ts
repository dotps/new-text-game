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
const gameModel = new Model()
const gameView = new View(services.get(InputOutputService))
const stateMachine = new StateMachine(gameModel, gameView, services)
const game = new GameController(gameModel, gameView, stateMachine, services)

game.run()

// TODO: почистить от ненужного кода
// TODO: добавить действие осмотреться и возможность взять предмет (сильно ли изменится код)
// TODO: добавить переход в состояние GameOver если возникает ошибка в коде