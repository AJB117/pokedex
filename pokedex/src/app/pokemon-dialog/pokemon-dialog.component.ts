import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css']
})
export class PokemonDialogComponent {
  // description: string;

  // constructor(
  //   private dialog: MatDialog,
  //   @Inject(MAT_DIALOG_DATA) data) {
  //     this.description = data.description;
  //   }
    
  //   openDialog() {
  //     this.dialog.open(PokemonDialog, {
  //       data: {
  //         animal: 'panda'
  //       }
  //     });
  //   }
  }
  
  // @Component({
  //   selector: 'pokemon-dialog',
  //   templateUrl: 'pokemon-dialog.component.html',
  // })
  // export class PokemonDialog {
  //   constructor(@Inject(MAT_DIALOG_DATA) public data) {}
  // }
