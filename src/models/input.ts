import {IInput} from "./input.interface"

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