import { Component, OnInit} from '@angular/core';
import { PokemonService } from './pokemon.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
// import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Pokedex';
  numCaught: any;

  constructor(private pokemonService: PokemonService
              ) {
  }

  ngOnInit() {
    this.numCaught = this.pokemonService.getNumCaught();
  }
}
