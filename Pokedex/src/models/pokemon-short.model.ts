import { Pokemon } from "./pokemon.model"

export class PokemonShort extends Pokemon {
    url: string

    constructor(name: string, url: string) {
        super(name)
        this.url = url
    }
}