import {IEnemy, IEnemyParams} from "./IEnemy"

export class Wolf implements IEnemy {
    readonly id: string
    readonly title: string

    constructor(params: IEnemyParams) {
        this.id = params?.id?.toString()
        this.title = params?.title?.toString()
    }

}