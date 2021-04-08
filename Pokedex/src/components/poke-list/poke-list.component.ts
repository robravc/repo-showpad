import { AfterViewInit, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonFull } from 'src/models/pokemon-full.model';
import { Pokemon } from 'src/models/pokemon.model';
import { State } from 'src/reducers/pokemon.reducer';
import { selectPokemon } from 'src/selectors/index.';
import { PageChangedEvent } from 'ngx-bootstrap/pagination'

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PokeListComponent implements AfterViewInit {
    pokemon$: Observable<PokemonFull[]> = of()

    @Input() totalPokemon!: number
    @Output() changePageEmitter: EventEmitter<{
        page: number,
        offset: number
    }> = new EventEmitter<{ page:number, offset: number }>()

    page: number = 1
    itemsPerPage: number = 20
    
    headers: string[] = [
      'No.', 
      'Image', 
      'Name', 
      'Height', 
      'Weight'
    ];    
    
    constructor(private readonly store: Store<State>) {}

    ngAfterViewInit(): void {
      this.pokemon$ = this.store
        .pipe(
          select(selectPokemon),
          map((pokemon: Pokemon[]) => pokemon.map((pokemon) => plainToClass(PokemonFull, pokemon)))
        )
    }

    changePage(event: PageChangedEvent): void {
      this.changePageEmitter.emit({
        page: event.page,
        offset: (event.page - 1) * event.itemsPerPage
      })
    }
}