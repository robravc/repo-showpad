import { Effect } from "./effect.model"

export class Ability {
    id: number
    name: string
    effect: Effect

    constructor(id: number, name: string, effect: Effect) {
        this.id = id
        this.name = name
        this.effect = effect
    }
}