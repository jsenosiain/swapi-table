import { createReducer, on } from '@ngrx/store';
import { loaded, page, reorder, search, sort } from './people.actions';

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
  search: '',
  page: {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  },
};

const reducer = createReducer(
  initialState,

  on(loaded, (state, { people, columns }) => {
    const column = columns ? columns.find(col => col.sort !== '') : null;

    return {
      ...state,
      initial: people,
      current: column ? [...people].sort(sorts[column.sort](column.name)).splice(0, 10) : [...people].splice(0, 10),
      columns: columns || state.columns,
      page: {
        length: people.length,
        pageIndex: 0,
        pageSize: 10,
        previousPageIndex: 0,
      },
    };
  }),

  on(reorder, (state, { current, previous }) => {
    const columns = fromTo([...state.columns])(current, previous);

    localStorage.setItem('columns', JSON.stringify(columns));

    return {
      ...state,
      columns,
    };
  }),

  on(page, (state, payload) => {
    const column = state.columns.find(c => c.sort !== '');
    let current = column ? [...state.initial].sort(sorts[column.sort](column.name)) : state.initial;
    current = current.filter(person => JSON.stringify(person).toLowerCase().search(state.search) !== -1);

    localStorage.setItem('page', JSON.stringify(payload.page).toLowerCase());

    return {
      ...state,
      current: current.splice((payload.page.pageIndex * 10), 10),
      page: payload.page,
    };
  }),
  on(search, (state, payload) => {
    const column = state.columns.find(c => c.sort !== '');
    let current = column ? [...state.initial].sort(sorts[column.sort](column.name)) : state.initial;
    current = current.filter(person => JSON.stringify(person).toLowerCase().search(payload.search.toLowerCase()) !== -1);

    localStorage.setItem('search', payload.search.toLowerCase());

    return {
      ...state,
      current: [...current].splice((state.page.pageIndex * 10), 10),
      search: payload.search.toLowerCase(),
      page: {
        ...state.page,
        length: current.length,
      }
    };
  }),
  on(sort, (state, { column }) => {
    let columns = [...state.columns];
    let current = [...state.initial];

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

    current = current.filter(person => JSON.stringify(person).toLowerCase().search(state.search.toLowerCase()) !== -1);

    columns = columns.map(c => (c.name !== column.name) ? c : {
      ...c,
      sort: column.sort === '' ? 'asc' : column.sort === 'asc' ? 'desc' : '',
    });

    localStorage.setItem('columns', JSON.stringify(columns));

    return {
      ...state,
      current: [...current].splice((state.page.pageIndex * 10), 10),
      columns,
    };
  }),
);

export function peopleReducer(state, action): any {
  return reducer(state, action);
}
