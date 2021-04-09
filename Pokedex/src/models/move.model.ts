import { DamageClass } from "./damage-class.model"
import { Effect } from "./effect.model"
import { Pokemon } from "./pokemon/pokemon.model"

export class Move {
    id: number
    effect: Effect
    learnedByPokemon: Pokemon[]
    damageClass: DamageClass

    constructor(id: number, effect: Effect, learnedByPokemon: Array<Pokemon>, damageClass: DamageClass) {
        this.id = id
        this.effect = effect
        this.learnedByPokemon = learnedByPokemon
        this.damageClass = damageClass
    }
}