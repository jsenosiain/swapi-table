import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { People } from '../data/people';
import { Person } from '../models/person';

@Injectable({ providedIn: 'root' })
export class SwapiService {
  constructor(private http: HttpClient) { }

  getPeople(page?: number): Observable<Person[]> {
    return of(People).pipe(delay(0));
  }
}
