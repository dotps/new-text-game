import {ILootParams} from "./Creature"

export interface ICreatureParams {
    [key: string]: string | number | boolean | ILootParams[]
}