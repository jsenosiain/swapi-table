import { createReducer, on } from '@ngrx/store';
import { loaded, sorted } from './people.actions';

export const initialState = [];

const reducer = createReducer(
  initialState,
  on(loaded, (state, { people }) => people),
  on(sorted, (state, payload) => {

    console.log('state', state);
    console.log('payload', payload);

    return state;
  })
);

export function peopleReducer(state, action): any {
  return reducer(state, action);
}
