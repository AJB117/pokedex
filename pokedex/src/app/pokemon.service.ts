import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2/';
  caught = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
  ) {
    this.updateNumCaught();
  }

  updateNumCaught() {
    this.caught.next(JSON.parse(localStorage.getItem("caught")).length);
  }

  getNumCaught() {
    return this.caught;
  }

  getPokemon(url: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(url);
  }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.baseUrl + 'pokemon?limit=150');
  }

}
