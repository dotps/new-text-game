import {IEnemy} from "../Models/Enemies/IEnemy"
import {Wolf} from "../Models/Enemies/Wolf"
import {IEnemyParams} from "../Models/Enemies/IEnemyParams"
import {Enemies} from "../Models/Enemies/Enemies"

export class EnemyFactory {
    static createEnemy(params: IEnemyParams): IEnemy | null {
        switch (params.id) {
            case Enemies.WOLF:
                return new Wolf(params)

            default:
                return null
        }
    }
}