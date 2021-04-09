import { Pokemon } from "src/models/pokemon/pokemon.model"

export class ChangePageEvent {
    page: number 
    offset: number 

    constructor(page: number , offset: number) {
        this.page = page
        this.offset = offset
    }
}

export class ShowDetailsEvent {
    pokemon: Pokemon

    constructor(pokemon: Pokemon) {
        this.pokemon = pokemon
    }
}