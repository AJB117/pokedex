import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDialogComponent } from './pokemon-stats/pokemon-stats.component';

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
              private _snackBar: MatSnackBar,
              private dialog: MatDialog
    ) {
      
  }

  addCaught(pkmn: Pokemon) {
    if (this.pokemonService.addCaught(pkmn)) {
      this._snackBar.open(`Caught ${pkmn.name}`, "", {
        duration: 2000,
        panelClass: 'center'
      });
    } else {
      this._snackBar.open(`${pkmn.name} already caught`, "", {
        duration: 2000,
        panelClass: 'center'
      });
    }
  }
  
  remove(pkmn: Pokemon) {
    this.pokemonService.remove(pkmn);
    this.router.navigate(['/caught']);
    this._snackBar.open(`Removed ${pkmn.name}`, "", {
      duration: 2000,
      panelClass: 'center'
    });
  }

  addTeam(pkmn: Pokemon) {

  }

  showStats(pkmn: Pokemon) {
    const dialogRef = this.dialog.open(PokemonDialogComponent, {
      width: '500px',
      data: pkmn,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
