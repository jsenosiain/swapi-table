import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Person } from './models/person';
import { SwapiSearchComponent } from './swapi/components/swapi-search/swapi-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SwapiSearchComponent, { static: true }) search: SwapiSearchComponent;

  columns: string[];
  people$: Observable<Person[]>;

  constructor(private store: Store<{ people: Person[] }>) {
    this.columns = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
    this.people$ = this.store.pipe(select('people'));
  }

  ngAfterViewInit(): void {
    this.search.search$
    .pipe(
      withLatestFrom(this.people$),
      map(([search, people]: [string, Person[]]) => people
        .filter(person => JSON.stringify(person).search(search) !== -1)),
    )
    .subscribe(console.log);
  }
}
