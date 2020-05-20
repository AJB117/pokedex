import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-caught-list',
  templateUrl: './caught-list.component.html',
  styleUrls: ['./caught-list.component.css'],
})
export class CaughtListComponent implements OnInit {

  caught: string[];
  fillerText: string;
  sub: any;
  barType: string;

  remove(pkmn: string) {
    let caught: any = JSON.parse(localStorage.getItem("caught"));
    let name: string = pkmn['name'];

    caught = caught.filter(c => {
      if (c['name'] !== name) return c;
    })
    
    localStorage.setItem("caught", JSON.stringify(caught))
    this.router.navigate(['/caught']);
    this.pokemonService.updateNumCaught();
  }

  constructor(private router: Router, private route: ActivatedRoute, private pokemonService: PokemonService) { 
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
    this.caught = JSON.parse(localStorage.getItem("caught"));
    if (!this.caught.length) {
      this.fillerText = "Add Pokemon you've caught";
    }
  }

}
