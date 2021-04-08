import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from 'src/components/navigation/navigation.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokeListComponent } from 'src/components/poke-list/poke-list.component';
import { PokeDetailsComponent } from 'src/components/poke-details/poke-details.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from 'src/services/pokemon.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from 'src/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from 'src/effects/pokemon.effects';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from "ngx-bootstrap/pagination"

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PokeListComponent,
    PokeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    NgxPaginationModule,
    PaginationModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([PokemonEffects]),
  ],
  exports: [
    MatTableModule
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
