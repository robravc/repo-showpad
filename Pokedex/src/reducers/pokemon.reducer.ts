import { Characteristic } from 'src/models/characteristic/characteristic.model';
import { Habitat } from 'src/models/habitat/habitat.model';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { PokemonActions, PokemonActionTypes } from '../actions/pokemon.actions';

export interface State {
  page: number
  count: number
  previous: string
  next: string
  pokemon: Pokemon[]
  pokemonInDetail: Pokemon
  characteristics: Characteristic[]
  habitats: Habitat[]
  captured: Pokemon[]
  wishlist: Pokemon[]
}
 
export const initialState: State = {
  page: 1,
  count: 0,
  previous: '',
  next: '',
  pokemon: [],
  pokemonInDetail: <Pokemon>{},
  characteristics: [],
  habitats: [],
  captured: [],
  wishlist: []
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

    case PokemonActionTypes.STORE_IN_CAPTURED: {
      return {
        ...state,
        captured: state.captured.concat(action.payload)
      }
    }

    case PokemonActionTypes.STORE_IN_WISHLIST: {
      return {
        ...state,
        wishlist: state.wishlist.concat(action.payload)
      }
    }

    case PokemonActionTypes.REMOVE_FROM_WISHLIST: {
      let wishlist = state.wishlist

      let newWishlist = wishlist.filter((pokemon: Pokemon) => {
         return pokemon.id !== action.payload.id
      })

      return {
        ...state,
        wishlist: newWishlist
      }
    }

    case PokemonActionTypes.REMOVE_FROM_CAPTURED: {
      let captured = state.captured

      let newCaptured = captured.filter((pokemon: Pokemon) => {
         return pokemon.id !== action.payload.id
      })

      return {
        ...state,
        captured: newCaptured
      }
    } 

    default: {
      return state;
    }
  }
}