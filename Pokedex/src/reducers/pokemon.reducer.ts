import { PokemonFull } from 'src/models/pokemon-full.model';
import { Pokemon } from 'src/models/pokemon.model'
import { PokemonActions, PokemonActionTypes } from '../actions/pokemon.actions'

export interface State {
  page: number
  count: number
  previous: string
  next: string
  pokemon: Pokemon[]
}
 
export const initialState: State = {
  page: 1,
  count: 0,
  previous: '',
  next: '',
  pokemon: []
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

    default: {
      return state;
    }
  }
}