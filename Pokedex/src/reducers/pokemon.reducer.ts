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
  captured: {
    count: number,
    pokemon: Pokemon[]
  },
  wishlist: {
    count: number,
    pokemon: Pokemon[]
  }
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
  captured: {
    count: 0,
    pokemon: []
  },
  wishlist: {
    count: 0,
    pokemon: []
  }
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
      let pokemon = state.captured.pokemon.concat(action.payload)

      return {
        ...state,
        captured: {
          count: pokemon.length,
          pokemon: pokemon
        }
      }
    }

    case PokemonActionTypes.STORE_IN_WISHLIST: {
      let pokemon = state.wishlist.pokemon.concat(action.payload)

      return {
        ...state,
        wishlist: {
          count: pokemon.length,
          pokemon: pokemon
        }
      }
    }

    case PokemonActionTypes.REMOVE_FROM_WISHLIST: {
      let wishlist = state.wishlist.pokemon

      let newWishlist = wishlist.filter((pokemon: Pokemon) => {
         return pokemon.id !== action.payload.id
      })

      return {
          ...state,
          wishlist: { 
            count: newWishlist.length,
            pokemon: newWishlist
        }
      }
    }

    case PokemonActionTypes.REMOVE_FROM_CAPTURED: {
      let captured = state.captured.pokemon

      let newCaptured = captured.filter((pokemon: Pokemon) => {
         return pokemon.id !== action.payload.id
      })

      return {
        ...state,
        captured: {
          count: newCaptured.length,
          pokemon: newCaptured
        }
      }
    } 

    default: {
      return state;
    }
  }
}