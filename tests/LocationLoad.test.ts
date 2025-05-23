import {Model} from "../src/Models/Model"
import {SaveLoadService} from "../src/Services/SaveLoadService"
import {Services} from "../src/Services/Services"
import {GameProgressData} from "../src/Data/GameProgressData"
import {InputOutputService} from "../src/Services/InputOutputService"
import {LocationState} from "../src/States/LocationState"
import {StateMachine} from "../src/States/StateMachine"
import {IView} from "../src/Views/IView"
import {LoadProgressState} from "../src/States/LoadProgressState"
import {LoadLevelState} from "../src/States/LoadLevelState"
import {CommandFactory} from "../src/Factories/CommandFactory"
import {Commands} from "../src/Commands/Commands"

describe("Загрузка локаций", () => {
    let model: Model
    let saveLoadService: SaveLoadService
    let services: Services
    let inputOutputService: InputOutputService
    let stateMachine: StateMachine
    let view: IView
    let originalProcessExit: typeof process.exit

    beforeEach(() => {
        console.log("======================================================================")
        console.log(expect.getState().currentTestName)

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

    beforeAll(() => {
        originalProcessExit = process.exit
        jest.spyOn(process, 'exit').mockImplementation(((code?: number) => {
            throw new Error('process.exit: ' + code)
        }) as any)
    })

    afterEach(() => {
        inputOutputService.close()
    })

    afterAll(() => {
        process.exit = originalProcessExit
    })

    const locationId = "BRANCH_2"
    test("> загрузка локации " + locationId, () => {
        const progressData = new GameProgressData()
        progressData.currentLocationId = locationId
        model.progressData = progressData

        const gameData = saveLoadService.loadGameData(model.progressData.currentLevelPath)
        if (gameData) {
            model.setGameData(gameData)
            model.setCurrentLocation(progressData.currentLocationId)
        }

        stateMachine.enter(LoadProgressState)

        const location = model.getCurrentLocation()

        expect(location).toBeDefined()
        expect(location.id).toBe(progressData.currentLocationId)

        console.log("Текущая локация", location.id)
    })

    test("> выполнение случайного действия в локации", () => {
        const progressData = new GameProgressData()
        progressData.currentLocationId = locationId
        model.progressData = progressData

        const gameData = saveLoadService.loadGameData(model.progressData.currentLevelPath)
        if (gameData) {
            model.setGameData(gameData)
            model.setCurrentLocation(progressData.currentLocationId)
        }

        stateMachine.enter(LoadProgressState)

        const location = model.getCurrentLocation()
        expect(location).toBeDefined()
        expect(location.actions.length).toBeGreaterThan(0)

        console.log("Стартовая локация", location.id)

        const randomIndex = Math.floor(Math.random() * location.actions.length)
        const randomAction = location.actions[randomIndex]
        expect(randomAction).toBeDefined()

        console.log("Использована команда", randomAction.command)
        
        const command = CommandFactory.createCommand(randomAction, model, stateMachine, view)
        expect(command).toBeDefined()

        try {
            command!.execute()
            const locationAfterCommand = model.getCurrentLocation()
            if (randomAction.command === Commands.TAKE_THING_COMMAND) {
                const thingId = randomAction.params.thingId?.toString()
                const inventory = model.getInventory()
                const thing = inventory.get(thingId!)
                expect(thing).toBeDefined()
                expect(thing!.id).toBe(thingId)
            } else if (randomAction.command === Commands.NEXT_LOCATION_COMMAND) {
                const nextLocationId = randomAction.params.locationId?.toString()
                expect(locationAfterCommand.id).toBe(nextLocationId)
            }
            console.log("Текущая локация", locationAfterCommand.id)
        } catch (error: any) {
            expect(error.message).toBe('process.exit: 0')
        }
        // Выводим все сообщения, отправленные во view
        const allMessages = (view.displayText as jest.Mock).mock.calls.map(call => call[0])
        console.log("Все сообщения во view:", allMessages)
    })
})