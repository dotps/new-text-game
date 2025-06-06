export interface IInput {
    resetInput(): void
    get value(): string
    set value(value: string)
}