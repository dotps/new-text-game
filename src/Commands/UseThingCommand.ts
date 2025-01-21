import {IStateMachine} from "../States/IStateMachine"
import {IView} from "../Views/IView"
import {IModel} from "../Models/IModel"
import {IAction} from "../Actions/IAction"

export class UseThingCommand implements ICommand {

    private readonly action: IAction
    private readonly stateMachine: IStateMachine
    private readonly view: IView
    private readonly model: IModel
    private nothingMessage: string = "Ничего не произошло"

    constructor(action: IAction, model: IModel, stateMachine: IStateMachine, view: IView) {
        this.model = model
        this.action = action
        this.stateMachine = stateMachine
        this.view = view
    }

    execute(): void {
        const thingId = this?.action?.params?.thingId?.toString()
        const thing = this.model.getThing(thingId)
        const enemyManager = this.model.getEnemy()
        const enemy = enemyManager.getCurrentEnemy()

        if (enemy) {
            const damageEffectMessage = enemy.takeDamage(thing)
            this.view.displayText(damageEffectMessage)
        }
        else {
            this.view.displayText(this.nothingMessage)
        }
    }
}