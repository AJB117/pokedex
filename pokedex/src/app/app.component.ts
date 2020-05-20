import { Component} from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Pokedex';
  numCaught: number;

  constructor(public pokemonService: PokemonService) {
  }
}
