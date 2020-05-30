import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Pokemon } from 'src/app/pokemon/pokemon.model';
import { PokemonService } from 'src/app/pokemon/pokemon.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.css']
})
export class AddTeamsComponent implements OnInit {

  teamForm: FormGroup;
  teams: Pokemon[][] = []

  constructor(public dialogRef: MatDialogRef<AddTeamsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Pokemon,
              private pokemonService: PokemonService) {}
  
  
  onSubmit() {
    console.log(this.teamForm.value);
  }

  private initForm() {
    let name = '';
    let description = '';
    this.teamForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required)
    })
  }

  ngOnInit() {
    this.initForm();
  }

}
