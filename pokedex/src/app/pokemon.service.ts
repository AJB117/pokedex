import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, concat } from 'rxjs';
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

  getPokemon(url: string): Observable<Pokemon[]> {
    let pokemon: Observable<Pokemon[]> = new Observable<Pokemon[]>();
    
    return this.http.get<Pokemon[]>(url);
  }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.baseUrl + 'pokemon?limit=150');
  }

}
