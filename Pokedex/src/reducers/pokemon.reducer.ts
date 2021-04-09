import { Characteristic } from 'src/models/characteristic/characteristic.model';
import { Habitat } from 'src/models/habitat/habitat.model';
import { Illustration, IllustrationDetails } from 'src/models/illustration.model';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { Sprite } from 'src/models/sprites.model';
import { PokemonActions, PokemonActionTypes } from '../actions/pokemon.actions';

export interface State {
  page: number
  count: number
  previous: string
  next: string
  pokemon: Pokemon[]
  characteristics: Characteristic[],
  habitats: Habitat[]
  pokemonInDetail: Pokemon
}
 
export const initialState: State = {
  page: 1,
  count: 0,
  previous: '',
  next: '',
  pokemon: [],
  characteristics: [],
  habitats: [],
  pokemonInDetail: <Pokemon>{}
}
 
export function pokemonReducer(state = initialState, action: PokemonActions): State {
  switch (action.type) {
    case PokemonActionTypes.STORE_POKE_DETAILS: {
      return {
        ...state,
        page: action.payload.page,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        pokemon: action.payload.results
      }
    }

    case PokemonActionTypes.STORE_CHARACTERISTICS: {
      return {
        ...state,
        characteristics: action.payload.results
      }
    }

    case PokemonActionTypes.STORE_HABITATS: {
      return {
        ...state,
        habitats: action.payload.results
      }
    }

    case PokemonActionTypes.STORE_POKEMON_IN_DETAIL: {
      return {
        ...state,
        pokemonInDetail: action.payload
      }
    }

    default: {
      return state;
    }
  }
}