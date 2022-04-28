import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectData = state => state.addExam || initialState;

const makeSelectData = () =>
  createSelector(
    selectData,
    dataState => dataState,
  );

export { makeSelectData };
