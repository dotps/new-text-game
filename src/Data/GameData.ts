export class Action {
    constructor(
        public command: string = "",
        public title: string = "",
        public description: string = "",
        public params: CommandParams[] = [],
    ) {}
}

export class CommandParams {
    constructor(
        public name: string = "",
        public value: string = "",
    ) {}
}

export class Location {
    constructor(
        public id: string = "start",
        public title: string = "",
        public description: string = "",
        public actions: Action[] = [],
    ) {}
}

export class GameData {
    locations: Location[] = []

    getLocation(locationId: string): Location {
        const location = this.locations.find(location => location.id === locationId)
        if (!location) {
            throw new Error(`Location ${locationId} not found!`);
        }
        return location
    }
}
