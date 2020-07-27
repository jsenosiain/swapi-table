import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SwapiSearchComponent } from './components/swapi-search/swapi-search.component';
import { SwapiTableComponent } from './components/swapi-table/swapi-table.component';
import { SnakeToRawPipe } from './pipes/snake-to-raw.pipe';

@NgModule({
  declarations: [
    SwapiSearchComponent,
    SwapiTableComponent,
    SnakeToRawPipe,
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
