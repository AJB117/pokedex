import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  defaultUrl = 'https://pokeapi.co/api/v2/pokemon/1';
  pokemon$: Observable<Pokemon[]>;
  names = [];
  
  constructor(
    private http: HttpClient,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.pokemon$ = this.pokemonService.getAllPokemon();
    this.pokemon$
      .subscribe(pkmn => {
        console.log(typeof(pkmn));
        console.log(pkmn);
        this.names.push(pkmn.name);
        console.log(this.names[0]);
      });
  }

}
