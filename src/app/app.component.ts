import { AfterViewInit, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from './models/person';
import { search as searchPeople } from './store/people/people.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  columns: string[];
  people$: Observable<Person[]>;

  constructor(private store: Store<{ people: Person[] }>) {
    this.columns = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
    this.people$ = this.store.pipe(select('people'));

    // this.people$.subscribe(console.log);
  }

  searchChanged(search: string): void {
    this.store.dispatch(searchPeople({ search }));
  }
}
