import {ILootParams} from "./creature"

export interface ICreatureParams {
    [key: string]: string | number | boolean | ILootParams[]
}