import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetPokeShortsAction } from 'src/actions/pokemon.actions';
import { PokeResponse } from 'src/models/poke-response.model';
import { State } from 'src/reducers/pokemon.reducer';
import { PokemonService } from 'src/services/pokemon.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination'

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
    this.requestPage(1, 0);
  }

  changePage(event: { page: number, offset: number}): void {
    this.requestPage(event.page, event.offset)
  }

  requestPage(page:number, offset: number): void {
    this.pokemonService.getBatch(page, offset)
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
