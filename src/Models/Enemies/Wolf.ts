import {IEnemy} from "./IEnemy"
import {IEnemyParams} from "./IEnemyParams"

export class Wolf implements IEnemy {
    readonly id: string
    readonly title: string

    constructor(params: IEnemyParams) {
        this.id = params?.id?.toString()
        this.title = params?.title?.toString()
    }

}