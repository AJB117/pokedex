import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-caught-list',
  templateUrl: './caught-list.component.html',
  styleUrls: ['./caught-list.component.css']
})
export class CaughtListComponent implements OnInit {

  caught: string[];

  constructor() { }

  ngOnInit(): void {
    this.caught = JSON.parse(localStorage.getItem("caught"));

    console.log(this.caught)
    // console.log(JSON.parse(this.caught[0])['types'][0]['type']['name'])
    console.log(this.caught[1]['types'])
  }

}
