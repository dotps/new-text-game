import {IInput} from "./input.interface"

export class Input implements IInput {

    private _value: string = ""

    resetInput(): void {
        this._value = ""
    }

    get value(): string {
        return this._value
    }

    set value(value: string) {
        this._value = value
    }

}