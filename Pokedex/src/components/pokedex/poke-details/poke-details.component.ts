import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { Species } from 'src/models/species.model';
import { Stat } from 'src/models/stat.model';
import { State } from 'src/reducers/pokemon.reducer';
import { selectCaptured, selectPokemon, selectWishlist } from 'src/selectors';
import { PokemonService } from 'src/services/pokemon.service';
import {
  RemoveFromCapturedAction, RemoveFromWishlistAction,
  StoreInCapturedAction, StoreInWishlistAction
} from '../../../actions/pokemon.actions';

export enum POKEMON_ATTRIBUTE_HEADERS {
  STATS = 'Stats',
  MOVES = 'Moves',
  OTHER = 'Others'
}

export enum ACTION_STATE {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

const STAR_IMG_ROOT = '../../../assets/img/star.png'
const POKEBALL_IMG_ROOT = '../../../assets/img/pokeball.png'

@Component({
  selector: 'poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})
export class PokeDetailsComponent {
  starImgRoot: string = STAR_IMG_ROOT
  pokeballImgRoot: string = POKEBALL_IMG_ROOT

  pokemonInDetail: Pokemon = <Pokemon>{}

  images$: Observable<string[]> = of()
  background: string = ''
  mainImage: string = ''

  showDetails: boolean = false
  noDetail: boolean = true

  statsHeader = POKEMON_ATTRIBUTE_HEADERS.STATS
  movesHeader = POKEMON_ATTRIBUTE_HEADERS.MOVES
  othersHeader = POKEMON_ATTRIBUTE_HEADERS.OTHER

  statsActive: boolean = true
  movesActive: boolean = false
  othersActive: boolean = false

  id: number = 0
  stats$: Observable<Stat[]> = of()
  species: Species = <Species>{}
  baseHappiness: number = 0
  baseExperience: number = 0
  captureRate: number = 0
  isBaby: boolean = false
  isLegendary: boolean = false
  isMythical: boolean = false
  habitat: string = ''
  color: string = ''

  isCaptured: boolean = false
  isWishlisted: boolean = false

  starActive: string = ACTION_STATE.INACTIVE
  pokeballActive: string = ACTION_STATE.INACTIVE

  constructor(private readonly store: Store<State>,
    private readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    if (this.pokemonInDetail && Object.keys(this.pokemonInDetail).length > 0) {
      this.retrievePokemonData()

      this.showDetails = true
      this.noDetail = false

      this.verifyWishlisted()
      this.verifyCaptured()
    }
  }

  retrievePokemonData(): void {
    this.id = this.pokemonInDetail.id
    this.mainImage = this.pokemonInDetail.sprites.other['official-artwork'].front_default

    this.images$ = of([
      this.pokemonInDetail.sprites.other['official-artwork'].front_default,
      this.pokemonInDetail.sprites.front_default,
      this.pokemonInDetail.sprites.other.dream_world.front_default
    ])

    this.baseExperience = this.pokemonInDetail.base_experience
    this.stats$ = of(this.pokemonInDetail.stats
      .map((stat: Stat): Stat => new Stat({ name: stat.stat.name, url: stat.stat.url }, stat.base_stat))
    )

    this.fetchSpecies(this.pokemonInDetail.species.url)
  }

  fetchSpecies(url: string): void {
    this.pokemonService.fetchSpecies(url).subscribe(
      (data: Species) => {
        this.isBaby = data.is_baby
        this.isLegendary = data.is_legendary
        this.isMythical = data.is_mythical

        this.habitat = data.habitat.name
        this.color = data.color.name

        this.baseHappiness = data.base_happiness
        this.captureRate = data.capture_rate
      }
    )
  }

  changeMainImage(image: string): void {
    this.mainImage = image
  }

  toggleWishlisted(): void {
    if (this.starActive === ACTION_STATE.INACTIVE) {
      this.store.dispatch(new StoreInWishlistAction(this.pokemonInDetail))
      this.starActive = ACTION_STATE.ACTIVE
      /* NOTIFICATION HERE */
    } else {
      this.store.dispatch(new RemoveFromWishlistAction(this.pokemonInDetail))
      this.starActive = ACTION_STATE.INACTIVE
      /* NOTIFICATION HERE */
    }
  }

  toggleCaptured(): void {
    if (this.pokeballActive === ACTION_STATE.INACTIVE) {
      this.store.dispatch(new StoreInCapturedAction(this.pokemonInDetail))
      this.pokeballActive = ACTION_STATE.ACTIVE
      /* NOTIFICATION HERE */
    } else {
      this.store.dispatch(new RemoveFromCapturedAction(this.pokemonInDetail))
      this.pokeballActive = ACTION_STATE.INACTIVE
      /* NOTIFICATION HERE */
    }
  }

  verifyWishlisted(): void {
    this.store.pipe(
      select(selectPokemon),
      map((pokemon) => {
        debugger
        console.log(pokemon)
      })
    )
  }

  verifyCaptured(): void {

  }

  ngOnDestroy() {

  }
}
