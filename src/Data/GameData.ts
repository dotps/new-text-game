// export class GameData {
//     public locations: Location[] = []
// }
//
// class Action {
// }
//
// export class Location {
//     id: string = ""
//     title: string = ""
//     description: string = ""
//     actions: Action[] = []
// }

export interface IAction {
    command: string
    title: string
    description: string
    nextLocationId: string | null
}

export interface ILocation {
    id: string
    title: string
    description: string
    actions: IAction[]
}

export class GameData {
    locations: ILocation[] = []
}
