import { createReducer, on } from '@ngrx/store';
import { loaded, search } from './people.actions';

export const initialState = [];

const reducer = createReducer(
  initialState,
  on(loaded, (state, { people }) => people),
  on(search, (state, payload) => {

    console.log('state', state);
    console.log('payload', payload);

    return state;
  })
);

export function peopleReducer(state, action): any {
  return reducer(state, action);
}
