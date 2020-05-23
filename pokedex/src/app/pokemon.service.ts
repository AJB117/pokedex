import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pokemon } from './pokemon';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2/';
  caughtChanged = new EventEmitter<Pokemon[]>();
  caught: Pokemon[] = localStorage.getItem("caught") === null ? [] : JSON.parse(localStorage.getItem("caught"));
  numCaught = new BehaviorSubject(this.caught.length);

  constructor(
    private http: HttpClient,
  ) {
    
  }
  
  getCaught() {
    return this.caught;
  }

  addCaught(pkmn: Pokemon): boolean {
    if (localStorage.getItem("caught") === null) {
      localStorage.setItem("caught", JSON.stringify([]));
    }
    if (!localStorage.getItem("caught").includes(JSON.stringify(pkmn))) {
      this.caught.push(pkmn);
      localStorage.setItem("caught", JSON.stringify(this.caught));
      this.caughtChanged.emit(this.caught.slice());
      this.numCaught.next(this.caught.length);
      return true;
    } else return false;
  }

  remove(pkmn: Pokemon): void {
    let name: string = pkmn['name'];
    this.caught = this.caught.filter(c => {
      if (c['name'] !== name) return c;
    })
    localStorage.setItem("caught", JSON.stringify(this.caught))
    this.numCaught.next(this.caught.length);
  }

  getNumCaught(): BehaviorSubject<number> {
    return this.numCaught;
  }

  getPokemon(url: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(url);
  }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.baseUrl + 'pokemon?limit=150');
  }

}
