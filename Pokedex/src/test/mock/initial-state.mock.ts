import { Pokemon } from "src/models/pokemon/pokemon.model";
import { mockPokemon } from "./pokemon.mock";

export const mockInitialState = {
    page: 1,
    count: 0,
    previous: '',
    next: '',
    pokemon: [mockPokemon],
    pokemonInDetail: <Pokemon>{},
    characteristics: [],
    habitats: [],
    captured: {
      count: 1,
      pokemon: [mockPokemon]
    },
    wishlist: {
      count: 0,
      pokemon: []
    }
  }
