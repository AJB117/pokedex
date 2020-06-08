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
  ) {}

  addToLocalStorage(thing: any, name: string, obj: any): boolean {
    if (localStorage.getItem(name) === null) {
      localStorage.setItem(name, JSON.stringify([]));
    }
    if (!localStorage.getItem(name).includes(JSON.stringify(thing))) {
      obj.push(thing);
      localStorage.setItem(name, JSON.stringify(obj));
      return true;
    }
    return false;
  }

  getTeams() {
    return this.teams;
  }

  addTeam(team: Team): boolean {
    // if (localStorage.getItem('teams') === null) {
    //   localStorage.setItem('teams', JSON.stringify([]));
    // }
    // if (!localStorage.getItem('teams').includes(JSON.stringify(team))) {
    //   this.teams.push(team);
    //   localStorage.setItem('teams', JSON.stringify(this.teams));
    //   this.numTeams.next(this.teams.length);
    //   return true;
    // } else {
    //   return false;
    // }
    if (this.addToLocalStorage(team, 'teams', this.teams)) {
      this.numTeams.next(this.teams.length);
      return true;
    }
    return false;
  }

  getCaught() {
    return this.caught;
  }

  addCaught(pkmn: Pokemon): boolean {
    if (this.addToLocalStorage(pkmn, 'caught', this.caught)) {
      this.numCaught.next(this.caught.length);
      return true;
    }
    return false;
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
    return this.http.get<Pokemon[]>(this.url, { params: {'limit': '150'}});
  }

}
