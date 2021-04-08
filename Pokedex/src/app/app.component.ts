import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetPokeShortsAction } from 'src/actions/pokemon.actions';
import { PokeResponse } from 'src/models/poke-response.model';
import { State } from 'src/reducers/pokemon.reducer';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Showpad Pokedex'
  totalPokemon: number = 0

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly store: Store<State>
  ) {}

  ngOnInit(): void {
    this.requestPage(0);
  }

  requestPage(offset: number): void {
    this.pokemonService.getBatch(1, offset)
      .subscribe(
        (data: PokeResponse) => {
          this.totalPokemon = data.count
          this.store.dispatch(new GetPokeShortsAction(data))
        },
        (err) => {

        }
      ) 
  }
}
