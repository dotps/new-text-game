import {IInput} from "./IInput"

export class Input implements IInput {

    value: string = ""

    resetInput(): void {
        this.value = ""
    }

    getValue(): string {
        return this.value
    }

    setValue(value: string): void {
        this.value = value
    }

}