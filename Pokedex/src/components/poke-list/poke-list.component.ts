import { Component, OnInit } from '@angular/core';
import { PokeListService } from 'src/service/poke-list.service';
@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
    constructor(private readonly pokeListService: PokeListService) { }

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'imageUrl'];
    dataSource = ELEMENT_DATA;

    ngOnInit(): void {
        this.pokeListService.getAllPokemon()
          .subscribe(
            (data) =>  {
                
            },
            (err) => {

            }
          )
    }
}