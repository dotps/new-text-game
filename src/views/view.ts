import {IInputOutputService} from "../services/input-output.interface"
import {ILocation} from "../locations/location.interface"
import {IView} from "./view.interface"
import {IAction} from "../actions/action.interface"
import {ICreature} from "../models/Creatures/creature.interface"

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
        this.displayActions(location.actions)
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