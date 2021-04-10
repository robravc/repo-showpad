import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers/pokemon.reducer';

@Component({
  selector: 'poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})
export class PokeDetailsComponent implements OnInit {   
  @Input() pokemonInDetail: Pokemon | undefined

  images$: Observable<(string | undefined)[]> = of()
  background: string = ''
  mainImage: string | undefined = ''

  showDetails: boolean = false
  noDetail: boolean = true

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    //this.updatePokemonOnDetail(this.pokemonInDetail)
  }

  renderImages(): void {
    this.mainImage = this.pokemonInDetail?.sprites.other['official-artwork'].front_default

    this.images$ = of([
      this.pokemonInDetail?.sprites.other['official-artwork'].front_default,
      this.pokemonInDetail?.sprites.front_default,
      this.pokemonInDetail?.sprites.other.dream_world.front_default
    ])
  }

  updatePokemonInDetail(pokemon: Pokemon): void {
    if (pokemon && Object.keys(pokemon).length > 0) {
      this.pokemonInDetail = pokemon

      this.renderImages()

      this.showDetails = true
      this.noDetail = false
    }
  }
}
