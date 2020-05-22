import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Pokemon } from '../../pokemon';

@Component({
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.css']
})
export class PokemonDialogComponent {

  constructor(public dialogRef: MatDialogRef<PokemonDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Pokemon) {
  }

  close() {
      this.dialogRef.close();
  }
}
