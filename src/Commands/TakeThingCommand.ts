import {IStateMachine} from "../States/IStateMachine"
import {IView} from "../Views/IView"
import {IModel} from "../Models/IModel"
import {CommandFactory} from "../Factories/CommandFactory"
import {Action} from "../Actions/Action"
import {IAction} from "../Actions/IAction"
import {ICommand} from "./ICommand"

export class TakeThingCommand implements ICommand {

    private readonly action: IAction
    private readonly stateMachine: IStateMachine
    private readonly view: IView
    private readonly model: IModel

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        this.model = model
        this.action = action
        this.stateMachine = stateMachine
        this.view = view
    }

    execute(): void {

        const thingId = this?.action?.params?.thingId?.toString()
        const thing = this.model.gameData.getThing(thingId)

        const inventory = this.model.getInventory()
        inventory.add(thing)
        this.view.displayText(this.action?.messageAfterExecute)

        const actionParams = this.action?.params?.action as IAction
        const action = new Action(actionParams?.command, actionParams?.title, actionParams?.description, actionParams?.messageAfterExecute, actionParams?.params)

        if (action?.command) {
            const command = CommandFactory.createCommand(action, this.model, this.stateMachine, this.view)
            if (command) command.execute()
        }
    }

}