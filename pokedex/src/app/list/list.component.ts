import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, concat, from, forkJoin, of, combineLatest } from 'rxjs';
import { map, merge, switchMap, mergeMap, flatMap, takeUntil, catchError, mergeAll, concatMap, concatAll, subscribeOn } from 'rxjs/operators';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
  pokemon$: Observable<Pokemon[]>;
  pokes$: any[];

  private readonly onDestroy = new Subject<void>();
  
  onClick() {
    // console.log(this.pokemon$);
    
    // let all$ = this.pokemon$.pipe(
    //   concatAll()
    //   );
    // console.log(this.pokemon$);

    // this.pokemon$.pipe(
    //   mergeAll()
    // );
    // this.pokemon$.subscribe(p => {
    //   console.log(p);
    // });
    // let all$ = (this.pokemon$);
    // console.log(all$);
    console.log(this.pokemon$);
    this.pokemon$.subscribe(p => {
      console.log(p);
      // p.subscribe(f => console.log(f));
    });
  }

  addCaught(pkmn: Observable<Pokemon>) {
    pkmn
      .pipe(takeUntil(this.onDestroy))
      .subscribe(p => {
        console.log(p);
        if (localStorage.getItem("caught")) {
            let caught = JSON.parse(localStorage.getItem("caught"));
            if (!localStorage.getItem("caught").includes(JSON.stringify(p))) {
              caught.push(p);
              localStorage.setItem("caught", JSON.stringify(caught));
            }
        } else {
          localStorage.setItem("caught", JSON.stringify([]));
          let caught = JSON.parse(localStorage.getItem("caught"));
          caught.push(p);
          localStorage.setItem("caught", JSON.stringify(caught));
        }
      })
    
  }

  constructor(
    private pokemonService: PokemonService,
    ) { }
    
    
    ngOnDestroy(): void {
      this.onDestroy.next();
    }
    
    ngOnInit() {
      this.pokes$ = [];
    // this.pokemon$ = this.pokemonService.getAllPokemon();

    // this.pokemon$
    //   .pipe(takeUntil(this.onDestroy))
    //   .subscribe(pkmn => {
    //     console.log(pkmn.results[0].url);
    //     this.names = pkmn;
    //   });

    // THIS WORKS 
    // this.pokemon$ = this.pokemonService.getAllPokemon().pipe(
    //   catchError(err => of([])),
    //   map(p => p['results'].map(p => p.url)),
    //   map(p => p.map(p => this.pokemonService.getPokemon(p))),
    //   // concatAll(),
    // );

      // this.pokemon$ = this.pokemonService.getAllPokemon().pipe(
      //   catchError(err => of([])),
      //   map(p => p['results'].map(p => p['url'])),
      //   map(p => p.map(p => this.pokemonService.getPokemon(p))),
      //   map(p => {
      //     let total = from(p).pipe(mergeAll());
      //     let a = <any>total;
      //     a = <Pokemon[]> a;
      //     return a;
      //   }),
      //   flatMap(r => combineLatest(of(r))),
      //   // map(p => {
      //   //   console.log(p);
      //   //   return p;
      //   // }),
      // );

      this.pokemon$ = this.pokemonService.getAllPokemon().pipe(
        catchError(err => of([])),
        map(p => p['results'].map(p => p['url'])),
        map(p => p.map(p => this.pokemonService.getPokemon(p))),
      );
  }
}
