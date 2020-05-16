import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
  pokemon$: Observable<Pokemon[]>;

  private readonly onDestroy = new Subject<void>();

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.pokemon$ = this.pokemonService.getAllPokemon();
    // this.pokemon$
    //   .pipe(takeUntil(this.onDestroy))
    //   .subscribe(pkmn => {
    //     console.log(pkmn.results);
    //     this.names = pkmn.results;
    //   });
  }
}
