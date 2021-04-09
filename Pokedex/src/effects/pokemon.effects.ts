import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FetchDetailsAction, PokemonActionTypes, StoreCharacteristicsAction, StoreHabitatsAction, StorePokemonDetailsAction } from 'src/actions/pokemon.actions';
import { Characteristic } from 'src/models/characteristic/characteristic.model';
import { Habitat } from 'src/models/habitat/habitat.model';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { PokeResponse } from 'src/models/response/poke-response.model';
import { PokemonService } from 'src/services/pokemon.service';

@Injectable()
export class PokemonEffects {
    constructor(
        private actions$: Actions,
        private pokemonService: PokemonService
    ) { }

    fetchDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PokemonActionTypes.FETCH_DETAILS),
            switchMap((action: FetchDetailsAction) => {
                return this.pokemonService.getBatchDetails(action.payload)
                    .pipe(
                        map((data: Pokemon[]) => {
                            return new StorePokemonDetailsAction(
                                new PokeResponse(
                                    action.payload.page,
                                    action.payload.count,
                                    action.payload.next,
                                    action.payload.previous,
                                    data
                                )
                            )
                        })
                    )
            })
        )
    })

    fetchCharacteristics$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PokemonActionTypes.FETCH_CHARACTERISTICS),
            switchMap((action: FetchDetailsAction) => {
                return this.pokemonService.fetchCharacteristicsDetails(action.payload)
                    .pipe(
                        map((data: Characteristic[]) => {
                            return new StoreCharacteristicsAction(new PokeResponse(0, 0, '', '', data))
                        })
                    )
            }))
    })

    fetchHabitats$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PokemonActionTypes.FETCH_HABITATS),
            switchMap((action: FetchDetailsAction) => {
                return this.pokemonService.fetchHabitatsDetails(action.payload)
                    .pipe(
                        map((data: Habitat[]) => {
                            return new StoreHabitatsAction(new PokeResponse(0, 0, '', '', data))
                        })
                    )
            })
        )
    })
}