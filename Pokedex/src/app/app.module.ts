import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from 'src/components/navigation/navigation.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokeListComponent } from 'src/components/poke-list/poke-list.component';
import { PokeDetailsComponent } from 'src/components/poke-details/poke-details.component';
import { MatTableModule } from '@angular/material/table';
import { PokeListService } from 'src/service/poke-list.service';
import { HttpClientModule } from '@angular/common/http';

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
    MatTableModule
  ],
  exports: [
    MatTableModule
  ],
  providers: [
    PokeListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
