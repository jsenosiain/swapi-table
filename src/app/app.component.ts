import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from './models/person';
import { reorder as reorderPeople, search as searchPeople, sort as sortPeople } from './store/people/people.actions';
import { SwapiColumn } from './swapi/components/swapi-table/swapi-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people$: Observable<Person[]>;

  constructor(private store: Store<{ people: Person[] }>) {
    this.people$ = this.store.pipe(select('people'));
  }

  columnChanged({ currentIndex, previousIndex }: CdkDragDrop<string[]>): void {
    this.store.dispatch(reorderPeople({ current: currentIndex, previous: previousIndex }));
  }

  searchChanged(search: string): void {
    this.store.dispatch(searchPeople({ search }));
  }

  sortChanged(column: SwapiColumn): void {
    this.store.dispatch(sortPeople({ column }));
  }
}
