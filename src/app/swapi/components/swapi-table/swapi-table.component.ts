import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-swapi-table',
  templateUrl: './swapi-table.component.html',
  styleUrls: ['./swapi-table.component.scss']
})
export class SwapiTableComponent implements OnInit {
  @Input() columns: string[];
  @Input() data: { initial: any[], current: any[] };

  constructor() { }

  ngOnInit(): void {}

}
