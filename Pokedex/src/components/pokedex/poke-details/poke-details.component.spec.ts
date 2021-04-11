import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NotifierService } from 'angular-notifier';
import { of } from 'rxjs';
import { StoreInCapturedAction, StoreInWishlistAction } from 'src/actions/pokemon.actions';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers';
import { selectCaptured, selectPokemonInDetail, selectWishlist } from 'src/selectors';
import { PokemonService } from 'src/services/pokemon.service';
import { mockInitialState } from 'src/test/mock/initial-state.mock';
import { mockPokemon } from 'src/test/mock/pokemon.mock';
import { mockNotifierService, mockPokemonService } from 'src/test/mock/pokemon.service.mock';
import { ACTION_STATE, PokeDetailsComponent } from './poke-details.component';

describe('PokeDetailsComponent', () => {
    let component: PokeDetailsComponent;
    let fixture: ComponentFixture<PokeDetailsComponent>;
    let store: MockStore<State>
    let pokemonService: PokemonService
    let notifierService: NotifierService
    let pokemon: Pokemon = mockPokemon
    let mockSelectPokemonInDetail
    let mockSelectWishlist
    let mockSelectCaptured

    let state = mockInitialState

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                PokeDetailsComponent
            ],
            providers: [
                provideMockStore({ initialState: state }),
                { provide: NotifierService, useClass: mockNotifierService },
                { provide: PokemonService, useClass: mockPokemonService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokeDetailsComponent);
        component = fixture.componentInstance;

        component.pokemonInDetail$ = of(pokemon)
        component.wishlist$ = of([pokemon])
        component.captured$ = of([pokemon])

        fixture.detectChanges();

        pokemonService = TestBed.inject(PokemonService)
        store = TestBed.inject(MockStore);
        notifierService = TestBed.inject(NotifierService)

        mockSelectPokemonInDetail = store.overrideSelector(selectPokemonInDetail, pokemon)
        mockSelectWishlist = store.overrideSelector(selectWishlist, [pokemon])
        mockSelectCaptured = store.overrideSelector(selectCaptured, [pokemon])

        store.refreshState()

        spyOn(store, 'dispatch').and.callFake(() => { })
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve pokemon data', () => {
        spyOn(component as any, 'fetchSpecies')

        component.retrievePokemonData(pokemon)

        expect(component.fetchSpecies).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/1');
    });

    it('should fetch the species', () => {
        spyOn(component as any, 'fetchSpecies')

        component.retrievePokemonData(pokemon)

        expect(component.fetchSpecies).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/1');
        expect(component.color).toBe('rojo')
    });

    it('should change main image', () => {
        component.changeMainImage('hallo')

        expect((component as any).mainImage).toBe('hallo')
    });

    it('should toggle wishlisted', () => {
        component.starActive = ACTION_STATE.INACTIVE
        component.toggleWishlisted()

        expect(store.dispatch).toHaveBeenCalledWith(new StoreInWishlistAction(pokemon))
        expect((component as any).starActive).toBe(ACTION_STATE.ACTIVE)
    });

    it('should toggle captured', () => {
        component.pokeballActive = ACTION_STATE.INACTIVE
        component.toggleCaptured()

        expect(store.dispatch).toHaveBeenCalledWith(new StoreInCapturedAction(pokemon))
        expect((component as any).pokeballActive).toBe(ACTION_STATE.ACTIVE)
    });
});
