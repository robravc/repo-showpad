import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NavigationComponent } from 'src/components/navigation/navigation.component';
import { PokedexModule } from 'src/components/pokedex/pokedex.module';
import { WishlistComponent } from 'src/components/wishlist/wishlist.component';
import { PokemonEffects } from 'src/effects/pokemon.effects';
import { reducers } from 'src/reducers';
import { PokemonService } from 'src/services/pokemon.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    PokedexModule,
    PaginationModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([PokemonEffects]),
  ],
  exports: [],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
