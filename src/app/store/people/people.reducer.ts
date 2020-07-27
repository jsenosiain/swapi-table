import { createReducer, on } from '@ngrx/store';
import { loaded, search, sort } from './people.actions';

export const initialState = {
  initial: [],
  current: [],

  columns: [
    { name: 'name', sort: '' },
    { name: 'height', sort: '' },
    { name: 'mass', sort: '' },
    { name: 'hair_color', sort: '' },
    { name: 'skin_color', sort: '' },
    { name: 'eye_color', sort: '' },
    { name: 'birth_year', sort: '' },
    { name: 'gender', sort: '' }
  ],
};

const sorts = {
  asc: c => (a, b) => a[c] < b[c] ? -1 : a[c] > b[c] ? 1 : 0,
  desc: c => (b, a) => a[c] < b[c] ? -1 : a[c] > b[c] ? 1 : 0,
};

const reducer = createReducer(
  initialState,
  on(loaded, (state, { people }) => {
    // load from cache and do appropriate actions if necessary
    // console.log('state', state);
    return {
      ...state,
      initial: people,
      current: people,
    };
  }),
  on(search, (state, payload) => ({
    ...state,
    current: state.current.filter(person => JSON.stringify(person).search(payload.search) !== -1),
  })),
  on(sort, (state, { column }) => {
    let columns = [...state.columns];
    let current = [...state.current];

    const currentSort = columns.find(c => c.sort !== '');

    if (currentSort && currentSort.name !== column.name) {
      columns = columns.map(c => ({ ...c, sort: '' }));
    }

    switch (column.sort) {
      case '':
        current.sort(sorts.asc(column.name));
        break;
      case 'asc':
        current.sort(sorts.desc(column.name));
        break;
      case 'desc':
        current = state.initial;
        break;
    }

    return {
      ...state,
      current,
      columns: columns.map(c => (c.name !== column.name) ? c : {
        ...c,
        sort: column.sort === '' ? 'asc' : column.sort === 'asc' ? 'desc' : '',
      }),
    };
  }),
);

export function peopleReducer(state, action): any {
  return reducer(state, action);
}



