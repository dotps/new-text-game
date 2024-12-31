export class MoveLeftCommand implements ICommand {
    description = "MoveLeft";
    result = "MoveLeft Result";

    execute() {
        console.log(this.description);
        console.log(this.result);
    }
}

export class MoveRightCommand implements ICommand {
    description = "MoveRight";
    result = "MoveRight Result";

    execute() {
        console.log(this.description);
        console.log(this.result);
    }
}

export class MoveBackCommand implements ICommand {
    description = "MoveBack";
    result = "MoveBack Result";

    execute() {
        console.log(this.description);
        console.log(this.result);
    }
}