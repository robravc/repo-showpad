import { Ability } from "./ability.model";
import { Move } from "./move.model";
import { Pokemon } from "./pokemon.model";
import { Species } from "./species.model";
import { Sprite } from "./sprites.model";
import { Type } from "./type.model";

export class PokemonFull extends Pokemon {
    abilities: Array<Ability>
    height: number
    moves: Array<Move>
    name: string
    order: number
    species: Species
    sprites: Sprite
    stats: Array<string>
    type: Type
    weight: number

    constructor(
        abilities: Array<Ability>, 
        height: number, 
        id: number, 
        moves: Array<Move>, 
        name: string, 
        order: number, 
        species: Species, 
        sprites: Sprite,
        stats: Array<string>, 
        type: Type, 
        weight: number
    ) {
        super(name, id)

        this.abilities = abilities
        this.height = height
        this.moves = moves
        this.name = name
        this.order = order
        this.species = species
        this.sprites = sprites
        this.stats = stats
        this.type = type
        this.weight = weight
    }
}