import { createAction, props } from '@ngrx/store';
import { Person } from '../../models/person';
import { SwapiColumn } from './../../swapi/components/swapi-table/swapi-table.component';

export type SortDirection = 'asc' | 'desc' | '';

export const load = createAction('[People] Load');
export const loaded = createAction('[People] Loaded', props<{ people: Person[] }>());
export const reorder = createAction('[People] Reorder', props<{ current: number, previous: number }>());
export const search = createAction('[People] Search', props<{ search: string }>())
export const sort = createAction('[People] Sort', props<{ column: SwapiColumn }>());
