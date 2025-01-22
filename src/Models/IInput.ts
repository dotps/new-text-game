export interface IInput {
    resetInput(): void
    getValue(): string
    setValue(value: string): void
}