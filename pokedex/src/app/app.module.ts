import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CaughtListComponent } from './caught-list/caught-list.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDialogComponent } from './pokemon/pokemon-stats/pokemon-stats.component';
import { TeamsComponent } from './teams/teams.component';
import { NavComponent } from './nav/nav.component';
import { AddTeamsComponent } from './teams/add-teams/add-teams.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonResolver } from './pokemon/pokemon-resolver.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FilterPipe,
    CaughtListComponent,
    PokemonComponent,
    NavComponent,
    TeamsComponent,
    AddTeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [PokemonService, PokemonResolver],
  bootstrap: [AppComponent],
  entryComponents: [PokemonDialogComponent, AddTeamsComponent]
})
export class AppModule { }
