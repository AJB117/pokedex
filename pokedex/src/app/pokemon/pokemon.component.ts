import { Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input('pkmn') pkmn: Pokemon;
  private readonly onDestroy = new Subject<void>();

  addCaught(pkmn: Pokemon) {
    if (localStorage.getItem("caught")) {
        let caught = JSON.parse(localStorage.getItem("caught"));
        if (!localStorage.getItem("caught").includes(JSON.stringify(pkmn))) {
          caught.push(pkmn);
          localStorage.setItem("caught", JSON.stringify(caught));
        }
    } else {
      localStorage.setItem("caught", JSON.stringify([]));
      let caught = JSON.parse(localStorage.getItem("caught"));
      caught.push(pkmn);
      localStorage.setItem("caught", JSON.stringify(caught));
    }
  }
    
  ngOnDestroy(): void {
    this.onDestroy.next();
    console.log(this.pkmn);
  }

  constructor() { 
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pkmn) {
      let p: Pokemon = new Pokemon();
      let copyP: Object = changes['pkmn'].currentValue;
      p.name = copyP['name'];
      p.front_default = copyP['sprites']['front_default'];
      p.type1 = copyP['types'][0]['type']['name'];
      p.type2 = copyP['types'].length > 1 ? copyP['types'][1]['type']['name'] : '';
      p.number = copyP['id'];
      console.log(p);
      this.pkmn = p;
    }
  }

  ngOnInit(): void {
  }

}
