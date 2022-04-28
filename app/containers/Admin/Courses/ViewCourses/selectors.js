import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectData = state => state.viewCourse || initialState;
// const selectrouter = state => state.router || initialState;

const makeSelectData = () =>
  createSelector(
    selectData,
    dataState => dataState,
  );

// const makeSelectRouter = () =>
//   createSelector(
//     selectrouter,
//     router => router,
//   );

export { makeSelectData };
