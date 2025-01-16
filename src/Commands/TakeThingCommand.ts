import {Action, IAction} from "../Data/GameData"
import {IStateMachine} from "../States/IStateMachine"
import {IView} from "../Views/IView"
import {IModel} from "../Models/IModel"
import {Logger} from "../Utils/Logger"
import {CommandFactory} from "../Factories/CommandFactory"
import {Thing} from "../Models/Things/Thing"

export class TakeThingCommand implements ICommand {

    private readonly action: IAction
    private readonly stateMachine: IStateMachine
    private readonly view: IView
    private readonly model: IModel
    // private inventory: IInventory

    // constructor(action: IAction, inventory: IInventory, stateMachine: IStateMachine) {
    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        // this.inventory = inventory
        this.model = model
        this.action = action
        this.stateMachine = stateMachine
        this.view = view
    }

    execute(): void {
        Logger.log(this.constructor.name)

        const thingId = this?.action?.params?.thingId?.toString()
        const thing = this.model.getThing(thingId)

        this.model.inventory.add(thing)
        this.view.displayText(this.action?.messageAfterExecute)

        const actionParams = this.action?.params?.action as IAction
        const action = new Action(actionParams?.command, actionParams?.title, actionParams?.description, actionParams?.messageAfterExecute, actionParams?.params)

        if (action?.command) {
            const command = CommandFactory.createCommand(action, this.model, this.stateMachine, this.view)
            if (command) command.execute()
        }
    }

}