import { AfterViewInit, Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Move } from 'src/models/move.model';

@Component({
  selector: 'poke-moves',
  templateUrl: './poke-moves.component.html',
  styleUrls: ['./poke-moves.component.scss']
})
export class PokeMovesComponent {
  @Input() moves$: Observable<Move[]> = of()
  @Input() color: string = ""
  
  constructor() { }
}
