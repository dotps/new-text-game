import {IView} from "./IView";
import {IAction, ILocation} from "../Data/GameData"
import {IInputOuotputService} from "../Services/IInputOuotputService"

export class View implements IView {
    private inputOutputService: IInputOuotputService

    constructor(inputOutputService: IInputOuotputService) {
        this.inputOutputService = inputOutputService
    }

    displayText(text: string): void {
        this.inputOutputService.displayText(text)
    }

    displayLocation(location: ILocation): void {
        this.inputOutputService.displayText(location.description)
        this.displayActions(location.actions)
    }

    displayActions(actions: IAction[]): void {

        if (actions.length === 0) return

        this.inputOutputService.displayText(`Доступные действия (введите 1..${actions.length}):`)
        actions.forEach((action, index) => {
            this.inputOutputService.displayText(`${index+1}. ${action.title}`)
        })
    }
}