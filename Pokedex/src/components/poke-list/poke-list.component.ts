import { AfterViewInit, Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonFull } from 'src/models/pokemon-full.model';
import { Pokemon } from 'src/models/pokemon.model';
import { State } from 'src/reducers/pokemon.reducer';
import { selectPokemon } from 'src/selectors/index.';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements AfterViewInit {
    pokemon$: Observable<PokemonFull[]> = of()

    @Input() totalPokemon!: number
    page: number = 1
    itemsPerPage: number = 20

    paginationConfig: object
    
    headers: string[] = [
      'No.', 
      'Image', 
      'Name', 
      'Height', 
      'Weight'
    ];    
    
    constructor(private readonly store: Store<State>) {
      this.paginationConfig = {
          itemsPerPage: 20, 
          currentPage: 1, 
          totalItems: this.totalPokemon
      }
    }

    ngAfterViewInit(): void {
      this.pokemon$ = this.store
        .pipe(
          select(selectPokemon),
          map((pokemon: Pokemon[]) => pokemon.map((pokemon) => plainToClass(PokemonFull, pokemon)))
        )
    }
}