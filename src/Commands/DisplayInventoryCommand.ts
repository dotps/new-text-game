import {IStateMachine} from "../States/IStateMachine"
import {IView} from "../Views/IView"
import {IModel} from "../Models/IModel"
import {LocationState} from "../States/LocationState"
import {ICommand} from "./ICommand"

export class DisplayInventoryCommand implements ICommand {

    private readonly stateMachine: IStateMachine
    private readonly view: IView
    private readonly model: IModel

    constructor(model: IModel, stateMachine: IStateMachine, view: IView) {
        this.model = model
        this.stateMachine = stateMachine
        this.view = view
    }

    execute(): void {
        this.displayInventory()
        this.stateMachine.enter(LocationState)
    }

    private displayInventory() {
        const inventory = this.model.getInventory()
        const things = inventory.getAll()
        if (things.length === 0) return

        this.view.displayText("ИНВЕНТАРЬ:")

        for (const thing of things) {
            this.view.displayText(thing.title)
        }
    }
}