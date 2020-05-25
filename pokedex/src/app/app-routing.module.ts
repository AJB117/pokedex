import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component'; 
import { CaughtListComponent } from './caught-list/caught-list.component';
import { PokemonResolver } from './pokemon/pokemon-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'list', component: ListComponent, resolve: {pokemon: PokemonResolver} },
  { path: 'caught', component: CaughtListComponent},
  { path: '**', redirectTo: '/list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
