import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FetchCharacteristicsAction, FetchHabitatsAction } from 'src/actions/pokemon.actions';
import { PokeResponse } from 'src/models/response/poke-response.model';
import { State } from 'src/reducers/pokemon.reducer';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Showpad Pokedex'

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCharacteristics()
    this.fetchHabitats()

    this.router.navigateByUrl('/pokedex')
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
