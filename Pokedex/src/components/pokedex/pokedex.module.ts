import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PokedexRoutingModule } from '../../app/routing/pokedex-routing.module';
import { PokeDetailsComponent } from './poke-details/poke-details.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokedexComponent } from './pokedex.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'
import { PokeStatsComponent } from './poke-details/poke-stats/poke-stats.component';
import { PokeMovesComponent } from './poke-details/poke-moves/poke-moves.component';
import { PokeOthersComponent } from './poke-details/poke-others/poke-others.component';
import { StatPipe } from 'src/pipes/stat.pipe';

@NgModule({
  declarations: [
    PokedexComponent,
    PokeListComponent,
    PokeDetailsComponent,
    PokeStatsComponent,
    PokeMovesComponent,
    PokeOthersComponent,
    StatPipe
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    PaginationModule,
    TabsModule,
    ProgressbarModule
  ],
  exports: [
    MatTableModule
  ],
})
export class PokedexModule { }
