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
    (state: State) => state.wishlist.pokemon
)

export const selectWishlistCount = createSelector(
    getPokemonState,
    (state: State) => state.wishlist.count
)

export const selectCaptured = createSelector(
    getPokemonState,
    (state: State) => state.captured.pokemon
)

export const selectCapturedCount = createSelector(
    getPokemonState,
    (state: State) => state.captured.count
)

export const selectPokemonInDetail = createSelector(
    getPokemonState,
    (state: State) => state.pokemonInDetail
)


