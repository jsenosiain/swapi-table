import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type SwapiSortDirection = 'asc' | 'desc' | '';

export interface SwapiColumn {
  name: string;
  sort: SwapiSortDirection;
}

@Component({
  selector: 'app-swapi-table',
  templateUrl: './swapi-table.component.html',
  styleUrls: ['./swapi-table.component.scss']
})
export class SwapiTableComponent implements OnInit {
  @Input() dataSource: { initial: any[], current: any[], columns: SwapiColumn[] };

  @Output() sortChanged: EventEmitter<SwapiColumn>;

  constructor() {
    this.sortChanged = new EventEmitter();
  }

  ngOnInit(): void {}

  sort(column: SwapiColumn): void {
    this.sortChanged.emit(column);
  }
}
