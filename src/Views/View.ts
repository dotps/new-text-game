import {IView} from "./IView";
import {ActionData} from "../Data/ActionData"
import {IAction, ILocation} from "../Data/GameData"
import {IIOService} from "../Services/IIOService"
import {IOService} from "../Services/IOService"

export class View implements IView {
    private _inputOutputService: IIOService

    constructor(inputOutputService: IIOService) {
        this._inputOutputService = inputOutputService
    }

    // inject(inputOutputService: IIOService) {
    //     this._inputOutputService = inputOutputService
    // }

    public displayLocation(location: ILocation): void {
        this._inputOutputService.displayText(location.description)
        this.displayActions(location.actions)
    }

    public displayActions(actions: IAction[]): void {
        this._inputOutputService.displayText(`Доступные действия (введите 1..${actions.length}):`)
        actions.forEach((action, index) => {
            this._inputOutputService.displayText(`${index+1}. ${action.title}`)
        })
    }

    update(action: ActionData): void {
        // this.displayText(action.text)
        // this.displayText(action.elements)
        this._inputOutputService.displayText(action.text)
        this._inputOutputService.displayText(action.elements)
    }
    // displayText(text?: string): void {
    //     if (!text)
    //         return
    //     console.log(text)
    // }
}