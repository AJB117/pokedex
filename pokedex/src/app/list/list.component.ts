import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../pokemon/pokemon.model';
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
    private route: ActivatedRoute) {
      this.barType = "list";
    }
    
    ngOnInit() {
      this.subscriptions.push(this.route.data
        .subscribe(
          (data: Data) => {
              this.pokemon$ = data['pokemon'];
          }
        ));
    }

    ngOnDestroy() {
      this.subscriptions.map(sub => {
        sub.unsubscribe();
      });
    }
}
