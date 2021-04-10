import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PokedexRoutingModule } from '../../app/routing/pokedex-routing.module';
import { PokeDetailsComponent } from './poke-details/poke-details.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokedexComponent } from './pokedex.component';

@NgModule({
  declarations: [
    PokedexComponent,
    PokeListComponent,
    PokeDetailsComponent,
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    PaginationModule,
  ],
  exports: [
    MatTableModule
  ],
})
export class PokedexModule { }
