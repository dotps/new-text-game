import {Model} from "../src/Models/Model"
import {SaveLoadService} from "../src/Services/SaveLoadService"
import {Services} from "../src/Services/Services"
import {GameProgressData} from "../src/Data/GameProgressData"
import {InputOutputService} from "../src/Services/InputOutputService"
import {LocationState} from "../src/States/LocationState"
import {StateMachine} from "../src/States/StateMachine"
import {IView} from "../src/Views/IView"

describe("Загрузка локаций", () => {
    let model: Model
    let saveLoadService: SaveLoadService
    let services: Services
    let inputOutputService: InputOutputService
    let stateMachine: StateMachine
    let view: IView

    beforeEach(() => {
        services = new Services()
        saveLoadService = services.get(SaveLoadService)
        inputOutputService = services.get(InputOutputService)
        model = new Model()
        view = {
            displayLocation: jest.fn(),
            displayText: jest.fn(),
            displayActions: jest.fn(),
            displayEnemy: jest.fn()
        }
        stateMachine = new StateMachine(model, view, services)
    })

    afterEach(() => {
        inputOutputService.close()
    })

    test("локация", () => {
        const progressData = new GameProgressData()
        progressData.currentLocationId = "BRANCH_2_FOREST_GLADE"
        model.progressData = progressData

        const gameData = saveLoadService.loadGameData(model.progressData.currentLevelPath)
        if (gameData) {
            model.setGameData(gameData)
        }
        const location = model.getCurrentLocation()
        console.log(location)

        // Переходим в состояние LocationState
        stateMachine.enter(LocationState)
        console.log(model.getCurrentState())

        expect(location).toBeDefined()
        expect(location.id).toBe("BRANCH_2_FOREST_GLADE")
        expect(location.title).toBeDefined()
        expect(location.description).toBeDefined()
        expect(location.actions).toBeDefined()
        expect(Array.isArray(location.actions)).toBe(true)
        expect(model.getCurrentState()).toBeInstanceOf(LocationState)
    })
})