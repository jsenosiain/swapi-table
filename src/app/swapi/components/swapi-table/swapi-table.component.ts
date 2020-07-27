import { CdkDragDrop } from '@angular/cdk/drag-drop';
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

  @Output() columnChanged: EventEmitter<CdkDragDrop<string[]>>;
  @Output() sortChanged: EventEmitter<SwapiColumn>;

  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century'
  ];

  constructor() {
    this.columnChanged = new EventEmitter();
    this.sortChanged = new EventEmitter();
  }

  ngOnInit(): void {}

  drop(drop: CdkDragDrop<string[]>): void {
    this.columnChanged.emit(drop);
  }

  sort(column: SwapiColumn): void {
    this.sortChanged.emit(column);
  }
}
