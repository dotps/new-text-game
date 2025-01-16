import {IModel} from "../Models/IModel"
import {ExitState} from "./ExitState";
import {Logger} from "../Utils/Logger"
import {IView} from "../Views/IView"
import {Commands} from "../Commands/Commands"
import {CommandFactory} from "../Factories/CommandFactory"
import {IStateMachine} from "./IStateMachine"
import {InputBattleState} from "./InputBattleState"
import {BattlePlayerTurnState} from "./BattlePlayerTurnState"
import {BattleEnemyTurnState} from "./BattleEnemyTurnState"

export class InputHandlerBattleState implements IState {

    private readonly stateMachine: IStateMachine
    private readonly model: IModel
    private readonly view: IView

    constructor(stateMachine: IStateMachine, model: IModel, view: IView) {
        this.stateMachine = stateMachine
        this.model = model
        this.view = view
    }

    async enter(): Promise<void> {
        Logger.log("enter " + this.constructor.name)

        if (this.model.currentInput === "") return

        switch (this.model.currentInput) {
            case Commands.EXIT:
                this.stateMachine.enter(ExitState)
                break
            default:
                this.handleNumberInput()
        }
    }

    private handleNumberInput() {

        // TODO: Продолжить тут, нужно обработать ввод на бое

        const input = parseInt(this.model.currentInput)
        const currentActions = this.model.getCurrentActions()
        const countCurrentActions = currentActions.length

        if (this.isNotCorrectInput(input, countCurrentActions)) {
            const actionsInputText = countCurrentActions > 0 ? `число от 1 до ${countCurrentActions} или ` : ``
            this.view.displayText(`Неверный ввод. Введите ${actionsInputText}"${Commands.EXIT}" для выхода`)
            this.view.displayActions(currentActions)
            this.stateMachine.enter(InputBattleState)
            return
        }

        const inputAction = currentActions[input-1]

        if (!inputAction.command) {
            this.view.displayText(`Отсутствует выбранное действие, введите другое значение или "${Commands.EXIT}" для выхода`)
            this.stateMachine.enter(InputBattleState)
            return
        }

        const command = CommandFactory.createCommand(inputAction, this.model, this.stateMachine, this.view)

        if (command) {
            command.execute()
            // this.stateMachine.enter(BattlePlayerTurnState)
            this.stateMachine.enter(BattleEnemyTurnState)
        }
        else {
            this.view.displayText(`Отсутствует команда выбранного действия, введите другое значение или "${Commands.EXIT}" для выхода`)
            this.stateMachine.enter(InputBattleState)
        }
    }

    exit(): void {
        Logger.log("exit " + this.constructor.name)
        this.model.resetCurrentInput()
    }

    private isNotCorrectInput(input: number, countCurrentActions: number): boolean {
        return isNaN(input) || input < 1 || input > countCurrentActions
    }
}