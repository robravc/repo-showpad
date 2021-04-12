import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PokemonService } from 'src/services/pokemon.service';
import { mockInitialState } from 'src/test/mock/initial-state.mock';
import { mockPokemonService } from 'src/test/mock/pokemon.service.mock';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let pokemonService
  let state = mockInitialState

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState: state }),
        { provide: PokemonService, useClass: mockPokemonService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    pokemonService = TestBed.inject(PokemonService)
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Pokedex'`, () => {
    expect(component.title).toEqual('Showpad Pokedex');
  });
});
