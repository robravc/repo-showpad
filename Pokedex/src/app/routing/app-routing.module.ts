import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapturedComponent } from 'src/components/captured/captured.component';
import { WishlistComponent } from 'src/components/wishlist/wishlist.component';

const routes: Routes = [
  { 
    path: 'pokedex',
    loadChildren: () => import('../../components/pokedex/pokedex.module').then(m => m.PokedexModule)
  },
  { path: 'captured', component: CapturedComponent },
  { path: 'wishlist', component: WishlistComponent },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
