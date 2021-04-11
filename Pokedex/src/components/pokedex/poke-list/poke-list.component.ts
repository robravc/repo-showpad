import { AfterViewInit, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { plainToClass } from 'class-transformer';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangePageEvent, ShowDetailsEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers/pokemon.reducer';
import { selectPokemon } from 'src/selectors';
import { PokemonService } from 'src/services/pokemon.service';

export const HEADERS: string[] = [
  'No.',
  'Image',
  'Name',
  'Height',
  'Weight'
];

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PokeListComponent implements AfterViewInit {
  pokemon$: Observable<Pokemon[]> = of()

  @Input() totalPokemon!: number
  @Output() changePageEmitter: EventEmitter<ChangePageEvent> = new EventEmitter<ChangePageEvent>()
  @Output() showDetailsEmitter: EventEmitter<ShowDetailsEvent> = new EventEmitter<ShowDetailsEvent>()

  page: number = 1
  itemsPerPage: number = 20

  headers = HEADERS  

  constructor(private readonly store: Store<State>,
    private readonly pokemonService: PokemonService) { }

  ngAfterViewInit(): void {
    this.fillPokemon()
  }

  fillPokemon(): void {
    this.pokemon$ = this.store
      .pipe(
        select(selectPokemon),
        map(
          (pokemons) => pokemons.map((pokemon) => plainToClass(Pokemon, pokemon))
        )
      )
  }

  changePage(event: PageChangedEvent): void {
    this.changePageEmitter.emit(new ChangePageEvent(event.page, (event.page - 1) * event.itemsPerPage))
  }

  showDetails(pokemon: Pokemon): void {
    this.showDetailsEmitter.emit(new ShowDetailsEvent(pokemon))
  }

  searchPokemon(event: any): void {
    let value = event.srcElement.value

    if (value.length > 3) {
      this.pokemonService.searchPokemon(event.srcElement.value).subscribe(
        (data) => {
          this.pokemon$ = of([<Pokemon>data])
        },
        (err) => {
          console.log(err)
        }
      )
    }

    if (value === '') {
      this.fillPokemon()
    }
  }
}