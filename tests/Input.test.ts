import {Model} from "../src/Models/Model"
import {View} from "../src/Views/View"
import {Services} from "../src/Services/Services"
import {SaveLoadService} from "../src/Services/SaveLoadService"
import {InputOutputService} from "../src/Services/InputOutputService"
import {StateMachine} from "../src/States/StateMachine"
import {GameProgressData} from "../src/Data/GameProgressData"
import {InputHandlerState} from "../src/States/InputHandlerState"
import {Commands} from "../src/Commands/Commands"

beforeAll(() => {
    jest.spyOn(process, "exit").mockImplementation((() => {
    }) as any)
})

describe("Тестирование ввода", () => {
    let model: Model
    let view: View
    let services: Services
    let stateMachine: StateMachine
    let saveLoadService: SaveLoadService
    let inputOutputService: InputOutputService
    const locationId = "BRANCH_2"

    beforeEach(() => {
        services = new Services()
        saveLoadService = new SaveLoadService()
        inputOutputService = new InputOutputService()
        services.register(SaveLoadService, saveLoadService)
        services.register(InputOutputService, inputOutputService)

        model = new Model()
        view = new View(inputOutputService)

        stateMachine = new StateMachine(model, view, services)

        const progressData = new GameProgressData()
        progressData.currentLocationId = locationId
        model.progressData = progressData

        const gameData = saveLoadService.loadGameData(model.progressData.currentLevelPath)
        if (gameData) {
            model.setGameData(gameData)
            model.setCurrentLocation(progressData.currentLocationId)
        }

        view.displayText = jest.fn()
        view.displayActions = jest.fn()
        view.displayLocation = jest.fn()
    })

    afterEach(() => {
        jest.clearAllTimers()
        inputOutputService.close()
        jest.clearAllMocks()
    })

    it("тест ввода в локации " + locationId, () => {
        const location = model.getCurrentLocation()
        expect(location).toBeDefined()
        expect(location.id).toBe(locationId)
        expect(location.actions).toBeDefined()
        expect(Array.isArray(location.actions)).toBe(true)
        expect(location.actions.length).toBeGreaterThan(0)

        console.log("Стартовая локация", location.id)
        let message = []
        let input = "2"
        model.getInput().setValue(input)
        stateMachine.enter(InputHandlerState)
        message = (view.displayText as jest.Mock).mock.calls.slice(-1)[0]
        console.log("Ввод:", input)
        console.log("Сообщение:", message)
        console.log("==============================")

        input = "44"
        model.getInput().setValue(input)
        stateMachine.enter(InputHandlerState)
        message = (view.displayText as jest.Mock).mock.calls.slice(-1)[0]
        expect(message[0]).toContain("Неверный ввод")
        expect(message[0]).toContain(Commands.EXIT_KEY)
        console.log("Ввод:", input)
        console.log("Сообщение:", message)
        console.log("==============================")


        input = "test"
        model.getInput().setValue(input)
        stateMachine.enter(InputHandlerState)
        message = (view.displayText as jest.Mock).mock.calls.slice(-1)[0]
        expect(message[0]).toContain("Неверный ввод")
        expect(message[0]).toContain(Commands.EXIT_KEY)
        console.log("Ввод:", input)
        console.log("Сообщение:", message)
        console.log("==============================")
    })
}) 