import { Short } from "../short.model";
import { Stat } from "../stat.model";
import { Type } from "../type.model";

export class Pokemon {
    abilities: Short[]
    base_experience: number
    height: number
    id: number
    moves: Short[]
    name: string
    order: number
    species: Short
    sprites: any
    stats: Stat[]
    type: Type
    weight: number
    isCaptured: boolean
    isWishlisted: boolean

    constructor(
        abilities: Short[], 
        base_experience: number, 
        height: number, 
        id: number, 
        moves: Short[], 
        name: string, 
        order: number, 
        species: Short, 
        sprites: any, 
        stats: Stat[], 
        type: Type, 
        weight: number, 
        isCaptured: boolean, 
        isWishlisted: boolean
    ) {
        this.abilities = abilities
        this.base_experience = base_experience
        this.height = height
        this.id = id
        this.moves = moves
        this.name = name
        this.order = order
        this.species = species
        this.sprites = sprites
        this.stats = stats
        this.type = type
        this.weight = weight
        this.isCaptured = isCaptured
        this.isWishlisted = isWishlisted
    }    
}