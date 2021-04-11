import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ChangePageEvent, ShowDetailsEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers';
import { selectPokemon } from 'src/selectors';
import { PokemonService } from 'src/services/pokemon.service';
import { mockInitialState } from 'src/test/mock/initial-state.mock';
import { mockPokemon } from 'src/test/mock/pokemon.mock';
import { mockPokemonService } from 'src/test/mock/pokemon.service.mock';
import { PokeListComponent } from './poke-list.component';

describe('PokeListComponent', () => {
    let component: PokeListComponent;
    let fixture: ComponentFixture<PokeListComponent>;
    let store: MockStore<State>
    let pokemonService: PokemonService
    let pokemon: Pokemon = mockPokemon
    let mockSelectPokemon

    let state = mockInitialState

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                PokeListComponent
            ],
            providers: [
                provideMockStore({ initialState: state }),
                { provide: PokemonService, useClass: mockPokemonService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokeListComponent);
        component = fixture.componentInstance;

        component.totalPokemon = 1
        component.pokemon$ = of([pokemon])

        fixture.detectChanges();

        pokemonService = TestBed.inject(PokemonService)
        store = TestBed.inject(MockStore);

        mockSelectPokemon = store.overrideSelector(selectPokemon, [pokemon])

        store.refreshState()

        spyOn(store, 'dispatch').and.callFake(() => { })
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change page', () => {
        spyOn(component.changePageEmitter, 'emit');

        component.changePage({
            page: 2,
            itemsPerPage: 20
        })

        let event = new ChangePageEvent(2, 20)

        expect(component.changePageEmitter.emit).toHaveBeenCalledWith(event)
    })

    it('should change page', () => {
        spyOn(component.showDetailsEmitter, 'emit');

        component.showDetails(pokemon)

        let event = new ShowDetailsEvent(pokemon)

        expect(component.showDetailsEmitter.emit).toHaveBeenCalledWith(event)
    })
});
