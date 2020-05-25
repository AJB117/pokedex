import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
  pokemon$: Observable<Pokemon[]>;
  subscriptions: Subscription[] = [];
  barType: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute) {
      this.barType = "list";
    }
    
    ngOnInit() {
      this.subscriptions.push(this.route.data
        .subscribe(
          (data) => {
            this.pokemon$ = (data['pokemon']);
          }
        ));
    }

    ngOnDestroy() {
      this.subscriptions.map(sub => {
        console.log('Unsubbed!');
        sub.unsubscribe();
      });
    }
    
    clickme() {
      console.log(this.pokemon$);
      this.pokemon$.subscribe(
        (p) => {
          console.log(p);
        }
      );
    }
}
