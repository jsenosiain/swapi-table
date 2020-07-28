import { createReducer, on } from '@ngrx/store';
import { loaded, page as pagePeople, reorder, search as searchPeople, sort } from './people.actions';

const fromTo = (columns: any[]) => (from: number, to: number) => {
  const arr = [...columns];

  arr.splice(from, 0, arr.splice(to, 1)[0]);

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
    { name: 'age', sort: '' },
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
    const page = JSON.parse(localStorage.getItem('page')) || state.page;
    const search = localStorage.getItem('search') || state.search;
    const column = columns ? columns.find(col => col.sort !== '') : null;
    const current = (column ? [...people].sort(sorts[column.sort](column.name)) : [...people])
      .filter(person => JSON.stringify(person).toLowerCase().search(search) !== -1);

    return {
      ...state,
      initial: people,
      current: [...current].splice((page.pageIndex * 10), 10),
      columns: columns || state.columns,
      search,
      page: {
        ...page,
        length: current.length
      },
    };
  }),
  on(reorder, (state, { current, previous }) => {
    const columns = fromTo(state.columns)(current, previous);

    localStorage.setItem('columns', JSON.stringify(columns));

    return {
      ...state,
      columns,
    };
  }),
  on(pagePeople, (state, payload) => {
    const column = state.columns.find(c => c.sort !== '');
    const current = (column ? [...state.initial].sort(sorts[column.sort](column.name)) : state.initial)
      .filter(person => JSON.stringify(person).toLowerCase().search(state.search) !== -1);

    localStorage.setItem('page', JSON.stringify(payload.page));

    return {
      ...state,
      current: current.splice((payload.page.pageIndex * 10), 10),
      page: payload.page,
    };
  }),
  on(searchPeople, (state, payload) => {
    const column = state.columns.find(c => c.sort !== '');
    const current = (column ? [...state.initial].sort(sorts[column.sort](column.name)) : state.initial)
      .filter(person => JSON.stringify(person).toLowerCase().search(payload.search.toLowerCase()) !== -1);

    const page = {
      ...state.page,
      length: current.length,
      pageIndex: 0,
    };

    localStorage.setItem('search', payload.search.toLowerCase());
    localStorage.setItem('page', JSON.stringify(page));

    return {
      ...state,
      current: [...current].splice(0, 10),
      search: payload.search.toLowerCase(),
      page,
    };
  }),
  on(sort, (state, { column }) => {
    const columns = [...state.columns].map(c => (c.name !== column.name) ?
      { ...c, sort: '' } :
      { ...c, sort: column.sort === '' ? 'asc' : column.sort === 'asc' ? 'desc' : '' }
    );

    localStorage.setItem('columns', JSON.stringify(columns));

    let current = [...state.initial];

    switch (column.sort) {
      case '':
        current.sort(sorts.asc(column.name));
        break;
      case 'asc':
        current.sort(sorts.desc(column.name));
        break;
    }

    current = current
      .filter(person => JSON.stringify(person).toLowerCase().search(state.search) !== -1)
      .splice((state.page.pageIndex * 10), 10);

    return {
      ...state,
      current,
      columns,
    };
  }),
);

export function peopleReducer(state, action): any {
  return reducer(state, action);
}
