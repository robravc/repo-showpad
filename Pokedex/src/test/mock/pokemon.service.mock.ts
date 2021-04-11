import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { PokeResponse } from 'src/models/response/poke-response.model';
import { Short } from 'src/models/short.model';

export class mockPokemonService {
    getBatch(page: number, offset: number): Observable<{}> {
        return of({})
    }
    
    getBatchDetails(pokeResponse: PokeResponse): Observable<{}> {
        return of({})
    }

    fetchCharacteristics(): Observable<{}> {
        return of({})
    }

     fetchCharacteristicsDetails(pokeResponse: PokeResponse): Observable<{}> {
        return of({})
    }

    fetchHabitats(): Observable<{}> {
        return of({})
    }

     fetchHabitatsDetails(pokeResponse: PokeResponse): Observable<{}> {
        return of({})
    }

    fetchSpecies(url: string): Observable<{}> {
        return of({
            is_baby: true,
            is_legendary: true,
            is_mythical: true,
            habitat: new Short('ese', 'Ese'),
            color: new Short('rojo', ''),
            base_happiness: 123,
            capture_rate: 5678
        })
    }

    searchPokemon(name: string): Observable<Pokemon | unknown> {
        return of({})
    }
}

export class mockNotifierService {
    notify() {
        return {}
    }
}