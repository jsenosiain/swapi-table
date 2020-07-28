import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-swapi-search',
  templateUrl: './swapi-search.component.html',
  styleUrls: ['./swapi-search.component.scss']
})
export class SwapiSearchComponent implements OnInit, OnChanges {
  @Input() term: string;

  @Output() searchChanged: EventEmitter<string>;

  searchControl: FormControl;

  search$: Observable<string>;

  constructor() {
    this.searchChanged = new EventEmitter();
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.search$ = this.searchControl.valueChanges
    .pipe(
      debounceTime(250),
      tap(search => this.searchChanged.emit(search)),
    );
  }

  ngOnChanges(): void {
    this.searchControl.setValue(this.term, { emitEvent: false });
  }
}
