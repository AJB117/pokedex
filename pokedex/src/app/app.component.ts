import { Component} from '@angular/core';
import { PokemonService } from './pokemon.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
// import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Pokedex';
  numCaught: number;

  constructor(public pokemonService: PokemonService
              ) {
  }
}
