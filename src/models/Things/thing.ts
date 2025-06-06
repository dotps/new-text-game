import {IThingParams} from "./thing-params.interface"
import {IThing} from "./thing.interface"

export class Thing implements IThing {
    readonly id: string
    readonly title: string
    readonly damage: number = 0
    readonly damageText: string

    constructor(params: IThingParams) {
        this.id = params?.id?.toString()
        this.title = params?.title?.toString()
        this.damage = Number(params?.damage) || this.damage
        this.damageText = params?.damageText?.toString()
    }
}