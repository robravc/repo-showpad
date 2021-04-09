import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FetchCharacteristicsAction, FetchDetailsAction, FetchHabitatsAction } from 'src/actions/pokemon.actions';
import { PokeDetailsComponent } from 'src/components/poke-details/poke-details.component';
import { ChangePageEvent, ShowDetailsEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { PokeResponse } from 'src/models/response/poke-response.model';
import { State } from 'src/reducers/pokemon.reducer';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(PokeDetailsComponent) pokeDetailsComponent = new PokeDetailsComponent(this.store)

  title = 'Showpad Pokedex'
  totalPokemon: number = 0
  pokemonInDetail: Pokemon = <Pokemon>{}

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly store: Store<State>
  ) {}

  ngOnInit(): void {
    this.requestPage(1, 0);
  }

  changePage(event: ChangePageEvent): void {
    this.requestPage(event.page, event.offset)
  }

  requestPage(page:number, offset: number): void {
    this.pokemonService.getBatch(page, offset)
      .subscribe(
        (data: PokeResponse) => {
          this.totalPokemon = data.count ?? 0
          this.store.dispatch(new FetchDetailsAction(data))
          
          this.fetchCharacteristics()
          this.fetchHabitats()
        }
      ) 
  }

  showDetails(event: ShowDetailsEvent): void {
    this.pokemonInDetail = event.pokemon
    //this.store.dispatch(new StorePokemonInDetailAction(event.pokemon))
    this.pokeDetailsComponent.updatePokemonInDetail(event.pokemon)
  }

  fetchCharacteristics(): void {
      this.pokemonService.fetchCharacteristics().subscribe(
        (data: PokeResponse) => {
          this.store.dispatch(new FetchCharacteristicsAction(data))
        }
      )
  }

  fetchHabitats(): void {
    this.pokemonService.fetchHabitats().subscribe(
      (data: PokeResponse) => {
        this.store.dispatch(new FetchHabitatsAction(data))
      }
    )
  }
}
