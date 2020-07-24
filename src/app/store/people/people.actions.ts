import { createAction, props } from '@ngrx/store';
import { Person } from '../../models/person';

export type SortDirection = 'asc' | 'desc' | '';

export interface Sort {
  column: string;
  direction: SortDirection;
}

export const load = createAction('[People] Load');
export const loaded = createAction('[People] Loaded', props<{ people: Person[] }>());
export const sorted = createAction('[People] Sorted', props<{ sort: Sort[] }>());
