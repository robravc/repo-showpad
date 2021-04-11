import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Species } from 'src/models/species.model';

const OTHERS = [
  'Base Experience',
  'Habitat',
  'Growth Rate',
  'Shape',
  'Capture Rate',
]

@Component({
  selector: 'poke-others',
  templateUrl: './poke-others.component.html',
  styleUrls: ['./poke-others.component.scss']
})
export class PokeOthersComponent {
  @Input() species$: Observable<Species> = of()
  @Input() baseExperience: number = 0

  others: string[] = OTHERS

  constructor() { }
}
