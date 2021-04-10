import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stat } from 'src/models/stat.model';

@Component({
  selector: 'poke-stats',
  templateUrl: './poke-stats.component.html',
  styleUrls: ['./poke-stats.component.scss']
})
export class PokeStatsComponent implements OnInit {
  @Input() stats$: Observable<Stat[]> = of()

  constructor() { }

  ngOnInit(): void {
  }
}
