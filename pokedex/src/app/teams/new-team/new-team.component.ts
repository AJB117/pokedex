import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Pokemon } from 'src/app/pokemon/pokemon.model';
import { PokemonService } from 'src/app/pokemon/pokemon.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../team.model';


@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  teamForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewTeamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Pokemon,
              private pokemonService: PokemonService) { }

  onSubmit() {
    // this.newTeam.description = this.teamForm.value['description'];
    // this.newTeam.name = this.teamForm.value['name'];
    // console.log(this.data);
    // this.newTeam.pokemon.push(this.data);
    // this.pokemonService.addTeam(this.newTeam);
    this.pokemonService.addTeam(new Team(this.teamForm.value['description'], this.teamForm.value['name'], [this.data]));
    this.dialogRef.close();
  }

  private initForm(): void {
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
