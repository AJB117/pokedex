import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

export interface Pokemon {
  name: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  defaultUrl = 'https://pokeapi.co/api/v2/pokemon/1';
  names = [];
  
  constructor(
    private http: HttpClient,
  ) { }

  getAllPokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.defaultUrl);
  }
  ngOnInit() {
    this.getAllPokemon()
      .subscribe(pkmn => {
        console.log(typeof(pkmn));
        console.log(pkmn);
        this.names.push(pkmn.name);
        console.log(this.names[0]);
      });
  }

}
