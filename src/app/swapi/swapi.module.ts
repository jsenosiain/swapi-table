import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SwapiSearchComponent } from './components/swapi-search/swapi-search.component';
import { SwapiTableComponent } from './components/swapi-table/swapi-table.component';

@NgModule({
  declarations: [
    SwapiSearchComponent,
    SwapiTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SwapiSearchComponent,
    SwapiTableComponent,
  ],
})
export class SwapiModule { }
