import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-caught-list',
  templateUrl: './caught-list.component.html',
  styleUrls: ['./caught-list.component.css'],
})
export class CaughtListComponent implements OnInit {

  caught: Pokemon[] = [];
  fillerText: string;
  sub: any;
  barType: string;

  constructor(private router: Router, private pokemonService: PokemonService) { 
    this.barType = "caught";
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.caught = this.pokemonService.getCaught();
    if (!this.caught || !this.caught.length) {
      this.fillerText = "Add Pokemon you've caught";
    }
  }

}
