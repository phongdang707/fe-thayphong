import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectInfor = (state) => state.login || initialState;
const selectrouter = (state) => state.router || initialState;

const makeSelectProfile = () =>
  createSelector(selectInfor, (infoState) => infoState);

const makeSelectRouter = () => createSelector(selectrouter, (router) => router);

export { makeSelectProfile, makeSelectRouter };
