import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoveFromCapturedAction } from 'src/actions/pokemon.actions';
import { ChangePageEvent } from 'src/events/events';
import { Pokemon } from 'src/models/pokemon/pokemon.model';
import { State } from 'src/reducers';
import { selectCaptured, selectCapturedCount } from 'src/selectors';
import { HEADERS, IMG_FOLDER } from '../pokedex/poke-list/poke-list.component';

@Component({
  selector: 'app-captured',
  templateUrl: './captured.component.html',
  styleUrls: ['./captured.component.scss']
})
export class CapturedComponent implements OnInit {
  imgFolder: string = IMG_FOLDER
  headers = [
    ...HEADERS,
    'Remove'
  ]

  totalPokemon: number = 0
  itemsPerPage: number = 20
  pokemon$: Observable<Pokemon[]> = this.store.pipe(select(selectCaptured))

  @Output() changePageEmitter: EventEmitter<ChangePageEvent> = new EventEmitter<ChangePageEvent>()

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void { 
    this.store.pipe(
      select(selectCapturedCount),
      map((count: number) => this.totalPokemon = count)
    )
  }

  removeFromCaptured(pokemon: Pokemon): void {
    this.store.dispatch(new RemoveFromCapturedAction(pokemon))
  }

  changePage(event: PageChangedEvent): void {
    this.changePageEmitter.emit(new ChangePageEvent(event.page, (event.page - 1) * event.itemsPerPage))
  }
}
