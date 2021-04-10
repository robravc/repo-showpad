import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FetchDetailsAction, StorePokemonInDetailAction } from 'src/actions/pokemon.actions';
import { PokeDetailsComponent } from 'src/components/pokedex/poke-details/poke-details.component';
import { ChangePageEvent, ShowDetailsEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { PokeResponse } from 'src/models/response/poke-response.model';
import { State } from 'src/reducers/pokemon.reducer';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  @ViewChild(PokeDetailsComponent) pokeDetailsComponent: PokeDetailsComponent = <PokeDetailsComponent>{}

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
        }
      ) 
  }

  showDetails(event: ShowDetailsEvent): void {
    this.store.dispatch(new StorePokemonInDetailAction(event.pokemon))
    this.pokeDetailsComponent.ngOnInit()
  }
}
