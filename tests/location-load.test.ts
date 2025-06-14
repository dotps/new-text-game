import {StateMachine} from "../src/states/state-machine"
import {Model} from "../src/models/model"
import {SaveLoadService} from "../src/services/save-load.service"
import {Services} from "../src/services/services"
import {InputOutputService} from "../src/services/input-output.service"
import {IView} from "../src/views/view.interface"
import {GameProgressData} from "../src/data/game-progress.data"
import {LoadProgressState} from "../src/states/load-progress.state"
import {CommandFactory} from "../src/factories/command.factory"
import {Commands} from "../src/commands/commands"

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
            if (randomAction.command === Commands.TakeThingCommand) {
                const thingId = randomAction.params.thingId?.toString()
                const inventory = model.getInventory()
                const thing = inventory.get(thingId!)
                expect(thing).toBeDefined()
                expect(thing!.id).toBe(thingId)
            } else if (randomAction.command === Commands.NextLocationCommand) {
                const nextLocationId = randomAction.params.locationId?.toString()
                expect(locationAfterCommand.id).toBe(nextLocationId)
            }
            console.log("Текущая локация", locationAfterCommand.id)
        } catch (error: any) {
            expect(error.message).toBe('process.exit: 0')
        }

        const allMessages = (view.displayText as jest.Mock).mock.calls.map(call => call[0])
        console.log("Все сообщения во view:", allMessages)
    })
})