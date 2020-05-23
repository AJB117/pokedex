import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  pokemon$: Observable<Pokemon[]>;
  barType: string;

  constructor(
    private pokemonService: PokemonService,
    ) {
      this.barType = "list"
    }
    
    ngOnInit() {
      this.pokemon$ = this.pokemonService.getAllPokemon().pipe(
        catchError(err => of([])),
        map(p => p['results'].map(p => p['url'])),
        map(p => p.map(p => this.pokemonService.getPokemon(p))),
      );
    }
}
