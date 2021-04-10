import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoveFromWishlistAction } from 'src/actions/pokemon.actions';
import { ChangePageEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers/pokemon.reducer';
import { selectWishlist, selectWishlistCount } from 'src/selectors';
import { HEADERS } from '../pokedex/poke-list/poke-list.component';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  headers = [
    ...HEADERS,
    'Remove'
  ]

  totalPokemon: number = 0
  itemsPerPage: number = 20
  pokemon$: Observable<Pokemon[]> = this.store.pipe(select(selectWishlist))

  @Output() changePageEmitter: EventEmitter<ChangePageEvent> = new EventEmitter<ChangePageEvent>()

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void { 
    this.store.pipe(
      select(selectWishlistCount),
      map((count: number) => this.totalPokemon = count)
    )
  }

  removeFromWishlist(pokemon: Pokemon): void {
    this.store.dispatch(new RemoveFromWishlistAction(pokemon))
  }

  changePage(event: PageChangedEvent): void {
    this.changePageEmitter.emit(new ChangePageEvent(event.page, (event.page - 1) * event.itemsPerPage))
  }
}
