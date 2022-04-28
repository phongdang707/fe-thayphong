import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectData = state => state.addContent || initialState;

const makeSelectData = () =>
  createSelector(
    selectData,
    dataState => dataState,
  );

export { makeSelectData };
