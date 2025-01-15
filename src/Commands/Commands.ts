import {IModel} from "../Models/IModel"
import {Action, IAction, LocationParams, Thing} from "../Data/GameData"
import {LocationState} from "../States/LocationState"
import {IStateMachine} from "../States/IStateMachine"
import {CommandFactory} from "./CommandFactory"
import {Logger} from "../Utils/Logger"
import {IView} from "../Views/IView"

export class NextLocationCommand implements ICommand {

    private readonly action: IAction
    private readonly model: IModel
    private readonly stateMachine: IStateMachine

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine) {
        this.action = action
        this.model = model
        this.stateMachine = stateMachine
    }

    execute() {
        this.model.setLocation(new LocationParams(this.action?.params))
        this.stateMachine.enter(LocationState)
    }
}

export class ExitGameCommand implements ICommand {

    private model: IModel

    constructor(model: IModel) {
        this.model = model
    }

    execute() {

    }

}

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

        this.model.inventory.add(new Thing(this.action?.params))
        this.view.displayText(this.action?.messageAfterExecute)

        const actionParams = this.action?.params?.action as IAction
        const action = new Action(actionParams?.command, actionParams?.title, actionParams?.description, actionParams?.messageAfterExecute, actionParams?.params)

        if (action?.command) {
            const command = CommandFactory.createCommand(action, this.model, this.stateMachine, this.view)
            if (command) command.execute()
        }
    }

}

export class BattleCommand implements ICommand {

    private readonly action: IAction
    private readonly stateMachine: IStateMachine
    private readonly view: IView
    private readonly model: IModel

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        // this.inventory = inventory
        this.model = model
        this.action = action
        this.stateMachine = stateMachine
        this.view = view
    }

    execute(): void {
        Logger.log(this.constructor.name)

        this.model.setEnemy(new Enemy(this.action?.params))
        this.stateMachine.enter(BattleState)
        // TODO: реализовать бой
            // TODO: при выходе из BattleState enemy в модели должен удалятся

        //

        // this.model.inventory.add(new Thing(this.action?.params))
        // this.view.displayText(this.action?.messageAfterExecute)
        //
        // const actionParams = this.action?.params?.action as IAction
        // const action = new Action(actionParams?.command, actionParams?.title, actionParams?.description, actionParams?.messageAfterExecute, actionParams?.params)
        //
        // if (action?.command) {
        //     const command = CommandFactory.createCommand(action, this.model, this.stateMachine, this.view)
        //     if (command) command.execute()
        // }
    }

}

export enum commands {
    EXIT_COMMAND = "exit"
}

