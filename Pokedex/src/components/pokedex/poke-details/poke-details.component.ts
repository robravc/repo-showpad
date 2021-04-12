import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { combineLatest, Observable, of } from 'rxjs';
import { Move } from 'src/models/move.model';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { Species } from 'src/models/species.model';
import { Stat } from 'src/models/stat.model';
import { State } from 'src/reducers/pokemon.reducer';
import { selectCaptured, selectPokemonInDetail, selectWishlist } from 'src/selectors';
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
const PLACEHOLDER_STAR_ROOT = '../../../assets/img/placeholder_star.png'

@Component({
  selector: 'poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PokeDetailsComponent implements OnInit {
  starImgRoot: string = STAR_IMG_ROOT
  pokeballImgRoot: string = POKEBALL_IMG_ROOT
  placeholderStar: string = PLACEHOLDER_STAR_ROOT

  pokemonInDetail$: Observable<Pokemon> = this.store.pipe(select(selectPokemonInDetail))
  wishlist$: Observable<Pokemon[]> = this.store.pipe(select(selectWishlist))
  captured$: Observable<Pokemon[]> = this.store.pipe(select(selectCaptured))

  images$: Observable<string[]> = of()
  stats$: Observable<Stat[]> = of()
  moves$: Observable<Move[]> = of()
  species$: Observable<Species> = of()

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

  pokemonInDetail: Pokemon = <Pokemon>{}
  id: number = 0
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
    private readonly pokemonService: PokemonService,
    private readonly notifier: NotifierService) { }

  ngOnInit(): void {
    combineLatest([
      this.pokemonInDetail$,
      this.wishlist$,
      this.captured$
    ]).subscribe(([pokemonInDetail, wishlist, captured]) => {
      this.starActive = ACTION_STATE.INACTIVE
      this.pokeballActive = ACTION_STATE.INACTIVE

      if (pokemonInDetail && Object.keys(pokemonInDetail).length > 0) {
        this.pokemonInDetail = pokemonInDetail

        this.retrievePokemonData(pokemonInDetail)
  
        this.showDetails = true
        this.noDetail = false
  
        if (wishlist.length > 0) {
          this.verifyWishlisted(wishlist)
        }

        if (captured.length > 0) {
          this.verifyCaptured(captured)
        }
      }
    })
  }

  retrievePokemonData(pokemon: Pokemon): void {
    this.id = pokemon.id
    this.mainImage = pokemon.sprites.other['official-artwork'].front_default

    this.images$ = of([
      pokemon.sprites.other['official-artwork'].front_default,
      pokemon.sprites.front_default,
      pokemon.sprites.other.dream_world.front_default
    ])
    
    this.baseExperience = pokemon.base_experience

    this.stats$ = of(pokemon.stats
      .map((stat: Stat): Stat => new Stat({ name: stat.stat.name, url: stat.stat.url }, stat.base_stat))
    )

    this.moves$ = of(pokemon.moves)

    this.fetchSpecies(pokemon.species.url)
  }

  fetchSpecies(url: string): void {
    this.pokemonService.fetchSpecies(url).subscribe(
      (data: Species) => {
        this.species$ = of(data)
        
        this.isBaby = data.is_baby
        this.isLegendary = data.is_legendary
        this.isMythical = data.is_mythical

        this.habitat = data.habitat.name
        this.color = data.color.name

        this.baseHappiness = data.base_happiness
        this.captureRate = data.capture_rate
      },
      (err) => {
        console.log(err)
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
      this.notifier.notify('success', 'Pokemon successfully added to Wishlist');
    } else {
      this.store.dispatch(new RemoveFromWishlistAction(this.pokemonInDetail))
      this.starActive = ACTION_STATE.INACTIVE
      this.notifier.notify('success', 'Pokemon removed from the wishlist');
    }
  }

  toggleCaptured(): void {
    if (this.pokeballActive === ACTION_STATE.INACTIVE) {
      this.store.dispatch(new StoreInCapturedAction(this.pokemonInDetail))
      this.pokeballActive = ACTION_STATE.ACTIVE
      this.notifier.notify('success', 'Pokemon successfully added to Captured List');
    } else {
      this.store.dispatch(new RemoveFromCapturedAction(this.pokemonInDetail))
      this.pokeballActive = ACTION_STATE.INACTIVE
      this.notifier.notify('success', 'Pokemon removed to Captured List');
    }
  }

  verifyWishlisted(wishlist: Pokemon[]): void {
    for (let pokemon of wishlist) {
      if (pokemon.id === this.id) {
        this.starActive = ACTION_STATE.ACTIVE
      }
    }
  }

  verifyCaptured(captured: Pokemon[]): void {
    for (let pokemon of captured) {
      if (pokemon.id === this.id) {
        this.pokeballActive = ACTION_STATE.ACTIVE
      }
    }
  }
}
