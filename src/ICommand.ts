interface ICommand {
    execute(): void;
    description: string;
    result: string;
}