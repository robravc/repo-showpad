import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokeResponse } from 'src/models/poke-response.model';
import { PokemonFull } from 'src/models/pokemon-full.model';
import { PokemonShort } from 'src/models/pokemon-short.model';
import { Pokemon } from 'src/models/pokemon.model';

const POKEAPI_ROOT: string = 'https://pokeapi.co/api/v2/';

@Injectable()
export class PokemonService {
    constructor(private http: HttpClient) { }

    /**
     * Gets a batch of pokemon according to the offset sent
     * 
     * @param offset Number from where the search will start to look. E.g: Offset = 0 will get results from 0, 1, 2, .. , 20 (limit is
     *               always set to 20 for pagination)
     * @returns Observable of PokeResponse, which holds the information about the pagination
     */
    getBatch(page: number, offset: number): Observable<PokeResponse> {
        return this.http
            .get(`${POKEAPI_ROOT}pokemon?offset=${offset}&limit=20`)
            .pipe(
                map((data: any) => {
                    return new PokeResponse(
                        page,
                        data.count,
                        data.next,
                        data.previous,
                        data.results
                    )
                })
            )
    }

    /**
     * Gets details for a whole batch of PokeShorts
     * 
     * @see: src/models/pokemon-short.model
     * @param pokeResponse Response coming from the app controller, holding all the info about the pagination and the pokeShorts
     * @returns Observable with list of pokemon
     */
    getBatchDetails(pokeResponse: PokeResponse): Observable<PokemonFull[]> {
        let pokemonObservable = pokeResponse.results.map((pokeShort: Pokemon) => {
            let short = plainToClass(PokemonShort, pokeShort)

            return this.http
                .get(short.url)
                .pipe(
                    map((data: any) => {
                        return new PokemonFull(
                            data.abilities,
                            data.height,
                            data.id,
                            data.moves,
                            data.name,
                            data.order,
                            data.species,
                            data.sprites,
                            data.stats,
                            data.type,
                            data.weight
                        )
                    })
                )
        })
    
        return forkJoin(pokemonObservable);
    }
}