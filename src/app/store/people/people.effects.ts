import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SwapiService } from '../../services/swapi.service';

@Injectable()
export class PeopleEffects {
  loadPeople$ = createEffect(() => this.actions$.pipe(
    ofType('[People] Load'),
    mergeMap(() => this.swapi.getPeople()
      .pipe(
        map(people => ({ type: '[People] Loaded', people })),
        catchError(() => EMPTY),
      )
    ),
  ));

  constructor(private actions$: Actions, private swapi: SwapiService) {}
}
