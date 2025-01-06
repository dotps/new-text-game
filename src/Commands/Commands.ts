import {IModel} from "../Models/IModel"

export class NextLocationCommand implements ICommand {
    description = "NextLocation"
    result = "Move to Next Location"
    private _model: IModel

    constructor(model: IModel) {
        this._model = model
    }

    execute() {
        console.log(this.description)
        console.log(this.result)
        this._model.setLocation("village")
    }
}

