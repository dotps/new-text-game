import {IEnemy, IEnemyParams} from "../Models/Enemies/IEnemy"
import {Wolf} from "../Models/Enemies/Wolf"

export class EnemyFactory {
    static createEnemy(params: IEnemyParams): IEnemy | null {
        switch (params.id) {
            case "wolf":
                return new Wolf(params)

            default:
                return null
        }
    }
}