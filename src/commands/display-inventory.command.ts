import {ICommand} from "./command.interface"
import {IStateMachine} from "../states/state-machine.interface"
import {IView} from "../views/view.interface"
import {IModel} from "../models/model.interface"
import {LocationState} from "../states/location.state"

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

        this.view.displayText("ИНВЕНТАРЬ:")
        if (things.length === 0) this.view.displayText("пусто")


        for (const thing of things) {
            this.view.displayText(thing.title)
        }
    }
}