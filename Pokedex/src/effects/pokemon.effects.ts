import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { PokeResponse } from 'src/models/poke-response.model';
import { PokemonFull } from 'src/models/pokemon-full.model';
import { PokemonService } from 'src/services/pokemon.service';
import { GetPokeShortsAction, PokemonActionTypes, StorePokemonDetailsAction } from '../actions/pokemon.actions';

@Injectable()
export class PokemonEffects {
    constructor(
        private actions$: Actions,
        private pokemonService: PokemonService
    ) {}
    
    fetchPokemonInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PokemonActionTypes.GET_POKE_SHORTS),
            switchMap((action: GetPokeShortsAction) => {
                return this.pokemonService.getBatchDetails(action.payload)
                    .pipe(
                        map((data: PokemonFull[]) => {
                            return new StorePokemonDetailsAction(new PokeResponse(
                                    action.payload.page,
                                    action.payload.count,
                                    action.payload.next,
                                    action.payload.previous,
                                    data
                                )
                            )
                        })
                    )
            }),
        )    
    })
}