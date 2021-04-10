import { Action } from "@ngrx/store";
import { Pokemon } from "src/models/pokemon/pokemon.model";
import { PokeResponse } from "src/models/response/poke-response.model";

export enum PokemonActionTypes {
    FETCH_DETAILS = '[ShowpadPokedex] Fetch pokemon detail',
    FETCH_CHARACTERISTICS = '[ShowpadPokedex] Fetch characteristics',
    FETCH_HABITATS = '[ShowpadPokedex] Fetch habitats',
    STORE_POKE_DETAILS = '[ShowpadPokedex] Store pokemon in store',
    STORE_CHARACTERISTICS = '[ShopadPokedex] Store characteristics in store',
    STORE_HABITATS = '[ShopadPokedex] Storing the habitats in the store',
    STORE_POKEMON_IN_DETAIL = '[ShowpadPokedex] Store pokemon in detail',
    STORE_IN_CAPTURED = '[ShowpadPokedex] Store a pokemon in the captured list',
    STORE_IN_WISHLIST = '[ShowpadPokedex] Store a pokemon in the wish list',
    REMOVE_FROM_CAPTURED = '[ShowpadPokedex] Remove pokemon from the captured list',
    REMOVE_FROM_WISHLIST = '[ShowpadPokedex] Remove pokemon from the wish list',
}

export class FetchDetailsAction implements Action {
    readonly type = PokemonActionTypes.FETCH_DETAILS
    constructor(public payload: PokeResponse) {} 
}

export class FetchCharacteristicsAction implements Action {
    readonly type = PokemonActionTypes.FETCH_CHARACTERISTICS
    constructor(public payload: PokeResponse) {} 
}

export class FetchHabitatsAction implements Action {
    readonly type = PokemonActionTypes.FETCH_HABITATS
    constructor(public payload: PokeResponse) {} 
}

export class StorePokemonInDetailAction implements Action {
    readonly type = PokemonActionTypes.STORE_POKEMON_IN_DETAIL
    constructor(public payload: Pokemon) {}
}

export class StorePokemonDetailsAction implements Action {
    readonly type = PokemonActionTypes.STORE_POKE_DETAILS
    constructor(public payload: PokeResponse) {}
}

export class StoreCharacteristicsAction implements Action {
    readonly type = PokemonActionTypes.STORE_CHARACTERISTICS
    constructor(public payload: PokeResponse) {}
}

export class StoreHabitatsAction implements Action {
    readonly type = PokemonActionTypes.STORE_HABITATS
    constructor(public payload: PokeResponse) {}
}

export class StoreInCapturedAction implements Action {
    readonly type = PokemonActionTypes.STORE_IN_CAPTURED
    constructor(public payload: Pokemon) {}
}

export class StoreInWishlistAction implements Action {
    readonly type = PokemonActionTypes.STORE_IN_WISHLIST
    constructor(public payload: Pokemon) {}
}

export class RemoveFromCapturedAction implements Action {
    readonly type = PokemonActionTypes.REMOVE_FROM_CAPTURED
    constructor(public payload: Pokemon) {}
}

export class RemoveFromWishlistAction implements Action {
    readonly type = PokemonActionTypes.REMOVE_FROM_WISHLIST
    constructor(public payload: Pokemon) {}
}

export type PokemonActions = FetchDetailsAction
    | StorePokemonDetailsAction
    | StoreCharacteristicsAction
    | StoreHabitatsAction
    | StorePokemonInDetailAction
    | StoreInCapturedAction
    | StoreInWishlistAction
    | RemoveFromCapturedAction
    | RemoveFromWishlistAction
