import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from 'src/reducers/pokemon.reducer';

export interface AppState {
    pokemon: State;
}

const getPokemonState = createFeatureSelector<State>('pokemon');

export const selectPokemon = createSelector(
    getPokemonState,
    (state: State) => state.pokemon
);

export const selectWishlist = createSelector(
    getPokemonState,
    (state: State) => state.wishlist
)

export const selectCaptured = createSelector(
    getPokemonState,
    (state: State) => state.captured
)

export const selectPokemonInDetail = createSelector(
    getPokemonState,
    (state: State) => state.pokemonInDetail
)


