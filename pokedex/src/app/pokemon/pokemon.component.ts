import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input('pkmn') pkmn: Pokemon;
  @Input('barType') barType: string;

  constructor(private pokemonService: PokemonService,
              private router: Router,
              private _snackBar: MatSnackBar
    ) {
      
  }
  addCaught(pkmn: Pokemon) {
    let caught = JSON.parse(localStorage.getItem("caught"));
    if (!localStorage.getItem("caught").includes(JSON.stringify(pkmn))) {
      caught.push(pkmn);
      localStorage.setItem("caught", JSON.stringify(caught));
      this.pokemonService.updateNumCaught();
      this._snackBar.open(`Caught ${pkmn.name}`, "", {
        duration: 2000,
        panelClass: 'center'
      });
    } else {
      this._snackBar.open(`${pkmn.name} already caught`, "", {
        duration: 2000,
        panelClass: 'center',
      });
    }
  }
  
  remove(pkmn: Pokemon) {
    let caught: any = JSON.parse(localStorage.getItem("caught"));
    let name: string = pkmn['name'];

    caught = caught.filter(c => {
      if (c['name'] !== name) return c;
    })
    
    localStorage.setItem("caught", JSON.stringify(caught))
    this.router.navigate(['/caught']);
    this.pokemonService.updateNumCaught();
    this._snackBar.open(`Removed ${pkmn.name}`, "", {
      duration: 2000,
      panelClass: 'center'
    });
  }

  onUpdatePokemon(changes: SimpleChanges, barType: string) {
    if (barType === 'list') {
      let p: Pokemon = new Pokemon();
      let copyP: Object = changes['pkmn'].currentValue;
      p.name = copyP['name'];
      p.front_default = copyP['sprites']['front_default'];
      p.type1 = copyP['types'][0]['type']['name'];
      p.type2 = copyP['types'].length > 1 ? copyP['types'][1]['type']['name'] : '';
      p.number = copyP['id'];
      this.pkmn = p;
    }
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pkmn) {
      this.onUpdatePokemon(changes, this.barType);
    }
  }

  ngOnInit(): void {
  }

}
