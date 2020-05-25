import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Pokemon } from '../pokemon';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonService } from '../pokemon.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PokemonResolver implements Resolve<Pokemon[]> {
    constructor(private pokemonService: PokemonService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        let pkmn: any = this.pokemonService.getAllPokemon().pipe(
            catchError(err => of([])),
            map(p => p['results'].map(p => p['url'])),
            map(p => p.map(p => this.pokemonService.getPokemon(p)))
        );
        return pkmn;
    }
}