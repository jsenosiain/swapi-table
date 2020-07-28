import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from './models/person';
import {
  page as pagePeople,
  reorder as reorderPeople,
  search as searchPeople,
  sort as sortPeople
} from './store/people/people.actions';
import { SwapiColumn } from './swapi/components/swapi-table/swapi-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people$: Observable<any>;

  constructor(private store: Store<{ people: Person[] }>) {
    this.people$ = this.store.pipe(select('people'));
  }

  columnChanged({ currentIndex, previousIndex }: CdkDragDrop<string[]>): void {
    this.store.dispatch(reorderPeople({ current: currentIndex, previous: previousIndex }));
  }

  pageChanged(page: PageEvent): void {
    this.store.dispatch(pagePeople({ page }));
  }

  searchChanged(search: string): void {
    this.store.dispatch(searchPeople({ search }));
  }

  sortChanged(column: SwapiColumn): void {
    this.store.dispatch(sortPeople({ column }));
  }
}
