import {IView} from "./IView";
import {IAction, ILocation} from "../Data/GameData"
import {IInputOutputService} from "../Services/IInputOutputService"
import {ICreature} from "../Models/Creatures/ICreature"

export class View implements IView {

    private inputOutputService: IInputOutputService

    constructor(inputOutputService: IInputOutputService) {
        this.inputOutputService = inputOutputService
    }

    displayText(text: string): void {
        this.inputOutputService.displayText(text)
    }

    displayLocation(location: ILocation): void {
        this.inputOutputService.displayText("=====================================================")
        this.inputOutputService.displayText(location.title)
        this.inputOutputService.displayText("=====================================================")
        this.inputOutputService.displayText(location.description)
        if (!location.params.isGameOver) {
            this.displayActions(location.actions)
        }
        this.inputOutputService.displayText("=====================================================")
    }

    displayActions(actions: IAction[]): void {

        if (actions.length === 0) return

        this.inputOutputService.displayText(`Доступные действия (введите 1..${actions.length}):`)
        actions.forEach((action, index) => {
            this.inputOutputService.displayText(`${index+1}. ${action.title}`)
        })
    }

    displayEnemy(enemy: ICreature | null): void {
        if (!enemy) return
        this.inputOutputService.displayText(`Перед вами: ${enemy.title}`)
    }
}