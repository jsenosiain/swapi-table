import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
export class SwapiTableComponent {
  @Input() dataSource: any;

  @Output() columnChanged: EventEmitter<CdkDragDrop<string[]>>;
  @Output() sortChanged: EventEmitter<SwapiColumn>;

  constructor() {
    this.columnChanged = new EventEmitter();
    this.sortChanged = new EventEmitter();
  }

  drop(drop: CdkDragDrop<string[]>): void {
    this.columnChanged.emit(drop);
  }

  sort(column: SwapiColumn): void {
    this.sortChanged.emit(column);
  }
}
