import { createReducer, on } from '@ngrx/store';
import { loaded, search } from './people.actions';

export const initialState = {
  initial: [],
  current: []
};

const reducer = createReducer(
  initialState,
  on(loaded, (state, { people }) => ({ initial: people, current: people })),
  on(search, (state, payload) => ({
    ...state,
    current: state.initial.filter(person => JSON.stringify(person).search(payload.search) !== -1),
  }))
);

export function peopleReducer(state, action): any {
  return reducer(state, action);
}
