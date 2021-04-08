import { ActionReducerMap } from '@ngrx/store';
import { PokemonActions } from 'src/actions/pokemon.actions';
import * as pokemon from './pokemon.reducer';

export interface State {
  pokemon: pokemon.State;
}

export const reducers: ActionReducerMap<State, PokemonActions> = {
  pokemon: pokemon.pokemonReducer,
};