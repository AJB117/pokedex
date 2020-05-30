import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pokemon } from './pokemon.model';
import { Team } from '../teams/team.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon/';
  private caught: Pokemon[] = localStorage.getItem("caught") === null ? [] : JSON.parse(localStorage.getItem("caught"));
  private teams: Team[] = [];
  private numCaught = new BehaviorSubject(this.caught.length);
  private numTeams = new BehaviorSubject(this.teams.length);

  constructor(
    private http: HttpClient,
  ) {
    
  }
  
  getTeams() {
    return this.teams;
  }

  addTeam(team: Team) {
    console.log('before: ', this.teams);
    this.teams.push(team);
    console.log('after: ', this.teams);
    this.numTeams.next(this.teams.length);
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
      this.numCaught.next(this.caught.length);
      return true;
    } else return false;
  }

  remove(pkmn: Pokemon): void {
    let name: string = pkmn['name'];
    this.caught = this.caught.filter(c => {
      if (c['name'] !== name) return c;
    });
    localStorage.setItem("caught", JSON.stringify(this.caught))
    this.numCaught.next(this.caught.length);
  }

  getNumCaught(): BehaviorSubject<number> {
    return this.numCaught;
  }

  getNumTeams(): BehaviorSubject<number> {
    return this.numTeams;
  }

  getPokemon(url: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(url);
  }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url, { params: {'limit': '12'}});
  }

}
