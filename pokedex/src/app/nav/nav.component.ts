import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input('title') title: string;
  numCaught: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.numCaught = this.pokemonService.getNumCaught();
  }

}
