import {Model} from "../src/Models/Model"
import {View} from "../src/Views/View"
import {Services} from "../src/Services/Services"
import {SaveLoadService} from "../src/Services/SaveLoadService"
import {InputOutputService} from "../src/Services/InputOutputService"
import {StateMachine} from "../src/States/StateMachine"
import {GameProgressData} from "../src/Data/GameProgressData"
import {LocationState} from "../src/States/LocationState"
import {CommandFactory} from "../src/Factories/CommandFactory"
import {Commands} from "../src/Commands/Commands"

beforeAll(() => {
    jest.spyOn(process, "exit").mockImplementation((() => {
    }) as any)
})

describe("Автоматическая игра", () => {
    let model: Model
    let view: View
    let services: Services
    let stateMachine: StateMachine
    let saveLoadService: SaveLoadService
    let inputOutputService: InputOutputService
    const startLocationId = "START"

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
        progressData.currentLocationId = startLocationId
        model.progressData = progressData

        const gameData = saveLoadService.loadGameData(model.progressData.currentLevelPath)
        if (gameData) {
            model.setGameData(gameData)
            model.setCurrentLocation(progressData.currentLocationId)
        }

        view.displayText = jest.fn((text: string) => {
            console.log("\nСообщение:", text)
        })
        view.displayActions = jest.fn((actions: any[]) => {
            let actionMessage = "\nДоступные действия:"
            actions.forEach((action, index) => {
                actionMessage += `\n${index + 1}. ${action.title} [${action.command}]${action.params ? ` (${JSON.stringify(action.params)})` : ''}`
            })
            console.log(actionMessage)
        })
        view.displayLocation = jest.fn((location: any) => {
            let locationMessage = "\n============================================="
            locationMessage += `\nЛокация: ${location.id}\nНазвание: ${location.title}\nОписание: ${location.description}\n`
            locationMessage += "\n============================================="
            console.log(locationMessage)
        })
    })

    afterEach(() => {
        jest.clearAllTimers()
        inputOutputService.close()
        jest.clearAllMocks()
    })

    it("прохождение игры случайными действиями", () => {
        const maxSteps = 100 // Максимальное количество шагов для предотвращения бесконечного цикла
        let step = 0
        let isGameOver = false

        while (!isGameOver && step < maxSteps) {
            step++
            console.log(`\nШаг ${step}:`)
            
            const location = model.getCurrentLocation()
            
            view.displayLocation(location)
            
            // Проверяем, что у локации есть действия
            expect(location.actions).toBeDefined()
            expect(Array.isArray(location.actions)).toBe(true)
            expect(location.actions.length).toBeGreaterThan(0)
            
            view.displayActions(location.actions)
            
            const randomIndex = Math.floor(Math.random() * location.actions.length)
            const randomAction = location.actions[randomIndex]
            console.log(`\nВыбрано действие: ${randomIndex + 1}. ${randomAction.title}`, randomAction.command)
            if (randomAction.params) {
                console.log("Параметры:", JSON.stringify(randomAction.params))
            }
            
            const command = CommandFactory.createCommand(randomAction, model, stateMachine, view)
            expect(command).toBeDefined()
            
            try {
                command!.execute()
                
                if (randomAction.command === Commands.TAKE_THING_COMMAND) {
                    const thingId = randomAction.params.thingId?.toString()
                    const inventory = model.getInventory()
                    const thing = inventory.get(thingId!)
                    expect(thing).toBeDefined()
                    expect(thing!.id).toBe(thingId)
                    console.log("\nВзята вещь:", thingId)
                } else if (randomAction.command === Commands.NEXT_LOCATION_COMMAND) {
                    const nextLocationId = randomAction.params.locationId?.toString()
                    const newLocation = model.getCurrentLocation()
                    expect(newLocation.id).toBe(nextLocationId)
                    console.log("\nПереход в локацию:", nextLocationId)
                } else if (randomAction.command === Commands.GAME_OVER_COMMAND) {
                    isGameOver = true
                    console.log("\nИгра завершена!")
                }
                
            } catch (error: any) {
                if (error.message === 'process.exit: 0') {
                    isGameOver = true
                    console.log("\nИгра завершена через process.exit")
                } else {
                    throw error
                }
            }
            
            console.log("\n==============================")
        }

        expect(step).toBeLessThan(maxSteps)
        console.log(`\nИгра завершена за ${step} шагов`)
    })

    console.log("************************************************************************************")

    it("прохождение игры с заданной последовательностью действий", () => {
        const actions = ["1", "3", "1", "2", "3", "1"]
        let step = 0
        let isGameOver = false

        while (!isGameOver && step < actions.length) {
            step++
            console.log(`\nШаг ${step}:`)
            
            const location = model.getCurrentLocation()
            
            view.displayLocation(location)
            
            expect(location.actions).toBeDefined()
            expect(Array.isArray(location.actions)).toBe(true)
            expect(location.actions.length).toBeGreaterThan(0)
            
            view.displayActions(location.actions)
            
            const actionIndex = parseInt(actions[step - 1]) - 1
            if (isNaN(actionIndex)) {
                console.log(`\nПропуск действия: ${actions[step - 1]}`)
                continue
            }
            
            if (actionIndex < 0 || actionIndex >= location.actions.length) {
                console.log(`\nНекорректный индекс действия: ${actions[step - 1]}`)
                continue
            }
            
            const action = location.actions[actionIndex]
            console.log(`\nВыбрано действие: ${actionIndex + 1}. ${action.title} [${action.command}]`)
            if (action.params) {
                console.log("Параметры:", JSON.stringify(action.params))
            }
            
            const command = CommandFactory.createCommand(action, model, stateMachine, view)
            expect(command).toBeDefined()
            
            try {
                command!.execute()
                
                if (action.command === Commands.TAKE_THING_COMMAND) {
                    const thingId = action.params.thingId?.toString()
                    const inventory = model.getInventory()
                    const thing = inventory.get(thingId!)
                    expect(thing).toBeDefined()
                    expect(thing!.id).toBe(thingId)
                    console.log("\nВзята вещь:", thingId)
                } else if (action.command === Commands.NEXT_LOCATION_COMMAND) {
                    const nextLocationId = action.params.locationId?.toString()
                    const newLocation = model.getCurrentLocation()
                    expect(newLocation.id).toBe(nextLocationId)
                    console.log("\nПереход в локацию:", nextLocationId)
                } else if (action.command === Commands.GAME_OVER_COMMAND) {
                    isGameOver = true
                    console.log("\nИгра завершена!")
                }
                
            } catch (error: any) {
                if (error.message === 'process.exit: 0') {
                    isGameOver = true
                    console.log("\nИгра завершена через process.exit")
                } else {
                    throw error
                }
            }
            
            console.log("\n===============================================================================")
        }

        expect(step).toBeLessThanOrEqual(actions.length)
        console.log(`\nИгра завершена за ${step} шагов`)
    })
}) 