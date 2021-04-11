import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { RemoveFromWishlistAction } from 'src/actions/pokemon.actions';
import { ChangePageEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers';
import { selectWishlist } from 'src/selectors';
import { mockInitialState } from 'src/test/mock/initial-state.mock';
import { mockPokemon } from 'src/test/mock/pokemon.mock';
import { WishlistComponent } from './wishlist.component';

describe('WishlistComponent', () => {
  let component: WishlistComponent
  let fixture: ComponentFixture<WishlistComponent>
  let store: MockStore<State>
  let mockSelectWishlist
  let pokemon: Pokemon = mockPokemon

  let state = mockInitialState

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        WishlistComponent 
      ],
      providers: [
        provideMockStore({ initialState: state })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent)
    component = fixture.componentInstance

    component.pokemon$ = of([pokemon])

    store = TestBed.inject(MockStore)
    
    fixture.detectChanges()

    spyOn(store, 'dispatch').and.callFake(() => {})

    mockSelectWishlist = store.overrideSelector(selectWishlist, [pokemon])
    store.refreshState()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove from wishlist', () => {
    component.removeFromWishlist(pokemon)

    expect(store.dispatch).toHaveBeenCalledWith(
      new RemoveFromWishlistAction(pokemon)
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
