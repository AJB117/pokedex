import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(
    private http: HttpClient,
  ) { }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.baseUrl + 'pokemon?limit=150');
  }

}
