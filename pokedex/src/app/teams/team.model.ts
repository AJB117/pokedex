import { Pokemon } from '../pokemon/pokemon.model';

export class Team {
    constructor(public description: string, public name: string, public pokemon: Pokemon[]) {}
}