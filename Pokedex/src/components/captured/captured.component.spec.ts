import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { RemoveFromCapturedAction } from 'src/actions/pokemon.actions';
import { ChangePageEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers/pokemon.reducer';
import { selectCaptured } from 'src/selectors';
import { mockInitialState } from 'src/test/mock/initial-state.mock';
import { mockPokemon } from 'src/test/mock/pokemon.mock';
import { CapturedComponent } from './captured.component';

describe('CapturedComponent', () => {
  let component: CapturedComponent
  let fixture: ComponentFixture<CapturedComponent>
  let store: MockStore<State>
  let mockSelectCaptured
  let pokemon: Pokemon = mockPokemon

  let state = mockInitialState

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CapturedComponent 
      ],
      providers: [
        provideMockStore({ initialState: state })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturedComponent);
    component = fixture.componentInstance;    

    component.pokemon$ = of([pokemon])

    store = TestBed.inject(MockStore);
    
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {})

    mockSelectCaptured = store.overrideSelector(selectCaptured, [pokemon])
    store.refreshState()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove from captured', () => {
    component.removeFromCaptured(pokemon)

    expect(store.dispatch).toHaveBeenCalledWith(
      new RemoveFromCapturedAction(pokemon)
    )
  })

  it('should change page', () => {
    spyOn(component.changePageEmitter, 'emit');

    component.changePage({ 
      page: 2,
      itemsPerPage: 20
    })

    let event = new ChangePageEvent(2, 20)

    expect(component.changePageEmitter.emit).toHaveBeenCalledWith(event)
  })
});

