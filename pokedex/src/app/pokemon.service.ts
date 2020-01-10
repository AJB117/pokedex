import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  defaultUrl = 'https://pokeapi.co/api/v2/pokemon/1';

  constructor(
    private http: HttpClient,
  ) { }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.defaultUrl);
  }

}
