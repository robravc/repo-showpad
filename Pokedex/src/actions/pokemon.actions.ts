import { Action } from "@ngrx/store";
import { PokeResponse } from "src/models/poke-response.model";

export enum PokemonActionTypes {
    GET_POKE_SHORTS = '[ShowpadPokedex] Store pokemon short collection of 20, save previous and next urls for pagination',
    STORE_POKE_DETAILS = '[ShowpadPokedex] Store details for the 20 pokemon in the pokeshorts list'
}

export class GetPokeShortsAction implements Action {
    readonly type = PokemonActionTypes.GET_POKE_SHORTS
    constructor(public payload: PokeResponse) {}    
}

export class StorePokemonDetailsAction {
    readonly type = PokemonActionTypes.STORE_POKE_DETAILS
    constructor(public payload: PokeResponse) {}
}
    
export type PokemonActions = GetPokeShortsAction | StorePokemonDetailsAction
