import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/model/pokemon.model';

const ROOT_URL: string = 'https://pokeapi.co/api/v2/';

@Injectable()
export class PokeListService {
    constructor(private http: HttpClient) {}

    getAllPokemon(){
        /*
         * There are currently around 900 types of pokemon (893 to be exact)
         * @see: https://www.google.com/search?q=how+many+pokemon+are+there+2021&rlz=1C1OKWM_enDE941DE941&oq=how&aqs=chrome.0.69i59l3j46i67j0i67j69i60l3.1381j0j7&sourceid=chrome&ie=UTF-8
         */
        return this.http.get(`${ROOT_URL}pokemon?limit=900`)
    }
}