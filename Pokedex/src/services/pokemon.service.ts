import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Characteristic } from 'src/models/characteristic/characteristic.model';
import { Habitat } from 'src/models/habitat/habitat.model';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { PokeResponse } from 'src/models/response/poke-response.model';
import { Result } from 'src/models/response/result.model';
import { Short } from 'src/models/short.model';
import { Species } from 'src/models/species.model';

const POKEAPI_ROOT: string = 'https://pokeapi.co/api/v2/';
const HABITAT_IMAGE_URL_ROOT: string = '../assets/img/habitat_'

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
                }),
                catchError(err => {
                    return throwError(err);
                })
            )
    }

    /**
     * Gets details for a whole batch of results
     * 
     * @see: src/models/pokemon-short.model
     * @param pokeResponse Response coming from the app controller, holding all the info about the pagination and the pokeShorts
     * @returns Observable with list of pokemon
     */
    getBatchDetails(pokeResponse: PokeResponse): Observable<Pokemon[]> {
        let pokemonObservable: Observable<Pokemon>[] =
            pokeResponse.results.map((result: Result) => {
                return this.http
                    .get(result.url)
                    .pipe(
                        map((data: any): Pokemon => {
                            return new Pokemon(
                                data.abilities,
                                data.base_experience,
                                data.height,
                                data.id,
                                data.moves,
                                data.name,
                                data.order,
                                data.species,
                                data.sprites,
                                data.stats,
                                data.types[0].type,
                                data.weight,
                            )
                        }),
                        catchError(err => {
                            return throwError(err);
                        })
                    )
        })
    
        return forkJoin(pokemonObservable);
    }

    /**
     * Fetches characteristics from API
     * 
     * @returns Observable of pokeResponse which containes the shorts for the characteristics
     */
    fetchCharacteristics(): Observable<PokeResponse> {
        return this.http
            .get(`${POKEAPI_ROOT}characteristic`)
            .pipe(
                map((data: any) => { 
                    return new PokeResponse(0, 0, '', '', data.results) 
                }),
                catchError(err => {
                    return throwError(err);
                })
            )
    }

    /**
     * Retrieves the complete info for characteristics
     * 
     * @param pokeResponse Contains the short info for the characteristics
     * @returns Observable of full characteristics
     */
    fetchCharacteristicsDetails(pokeResponse: PokeResponse): Observable<Characteristic[]> {
        let characteristicsObservable: Observable<Characteristic>[] =
            pokeResponse.results.map((result: Result) => {
                return this.http
                    .get(result.url)
                    .pipe(
                        map((data: any): Characteristic	 => {
                            return new Characteristic(
                                data.descriptions.filter((description: any) => description.language['name'] === 'en')[0].description,
                                data.highest_stat,
                                data.id,
                            )
                        }),
                        catchError(err => {
                            return throwError(err);
                        })
                    )
        })
    
        return forkJoin(characteristicsObservable)
    }

    /**
     * Fetches habitats from API
     * 
     * @returns Observable of pokeResponse which containes the shorts for the habitats
     */
    fetchHabitats(): Observable<PokeResponse> {
        return this.http
            .get(`${POKEAPI_ROOT}pokemon-habitat`)
            .pipe(
                map((data: any) => { 
                    return new PokeResponse(0, 0, '', '', data.results) 
                }),
                catchError(err => {
                    return throwError(err);
                })
            )
    }

    /**
     * Retrieves the complete info for habitats
     * 
     * @param pokeResponse Contains the short info for the habitats
     * @returns Observable of full habitats
     */
    fetchHabitatsDetails(pokeResponse: PokeResponse): Observable<Habitat[]> {
        let habitatsObservable: Observable<Habitat>[] =
            pokeResponse.results.map((result: Result) => {
                return this.http
                    .get(result.url)
                    .pipe(
                        map((data: any): Habitat => {
                            return new Habitat(data.id, data.name, `${HABITAT_IMAGE_URL_ROOT}${data.name}.jpg`)
                        }),
                        catchError(err => {
                            return throwError(err);
                        })
                    )
        })
    
        return forkJoin(habitatsObservable)
    }

    /**
     * Retrieves the complete info for species of pokemon
     * 
     * @param pokeResponse Contains the short info for the species
     * @returns Observable of full species
     */
    fetchSpecies(url: string): Observable<Species> {
        return this.http
            .get(url)
            .pipe(
                map((data: any) => new Species(
                    data.base_happiness,
                    data.capture_rate,
                    data.color,
                    data.gender_rate,
                    new Short(data.growth_rate.name, data.growth_rate.url),
                    new Short(data.habitat.name, data.habitat.url),
                    data.id,
                    data.is_baby,
                    data.is_legendary,
                    data.is_mythycal,
                    data.name,
                    data.order,
                    data.shape
                )),
                catchError(err => {
                    return throwError(err);
                })
            )
    }

    /**
     * Fires a request to the pokeAPI to retrieve a pokemon with a name
     * 
     * @param name pokemon name
     * @returns Observable of pokemon or nothing
     */
    searchPokemon(name: string): Observable<Pokemon | unknown> {
        return this.http
            .get(`${POKEAPI_ROOT}pokemon/${name}`)
            .pipe(
                map((data: any): Pokemon => {
                    return new Pokemon(
                        data.abilities,
                        data.base_experience,
                        data.height,
                        data.id,
                        data.moves,
                        data.name,
                        data.order,
                        data.species,
                        data.sprites,
                        data.stats,
                        data.types[0].type,
                        data.weight,
                    )
                }),
                catchError(err => {
                    return throwError(err);
                })
            )
    }
}