import { createReducer, on } from '@ngrx/store';
import { loaded, reorder, search, sort } from './people.actions';

const fromTo = arr => (from, to) => {
  arr.splice(to, 0, arr.splice(from, 1)[0]);

  return arr;
};

const sorts = {
  asc: c => (a, b) => a[c] < b[c] ? -1 : a[c] > b[c] ? 1 : 0,
  desc: c => (b, a) => a[c] < b[c] ? -1 : a[c] > b[c] ? 1 : 0,
};

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

const reducer = createReducer(
  initialState,
  on(loaded, (state, { people }) => ({
    ...state,
    initial: people,
    current: people,
  })),
  on(reorder, (state, { current, previous }) => ({
    ...state,
    columns: fromTo([...state.columns])(current, previous),
  })),
  on(search, (state, payload) => ({
    ...state,
    current: state.initial.filter(person => JSON.stringify(person).search(payload.search) !== -1),
    columns: state.columns.map(c => ({ ...c, sort: '' })),
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



