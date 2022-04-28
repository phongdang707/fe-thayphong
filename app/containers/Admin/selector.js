/**
 * Dashboard selectors
 */

import { createSelector } from 'reselect';

// import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboard = state => state.get('dashboard');

const makeSelectPortal = state => state.get('dashboard').userInfo.portal;

const makeSelectUser = state => state.get('dashboard').userInfo.user;
const makeSelectUserInfo = state => state.get('dashboard').userInfo;
const makeSelectRoles = state => state.get('dashboard').roles;
// const makeSelectDashboardLoading = state => state.get('dashboard').isLoading;

export {
  selectDashboard,
  makeSelectUserInfo,
  makeSelectUser,
  makeSelectPortal,
  makeSelectRoles,
  // makeSelectDashboardLoading,
};

/**
 * Direct selector to the Story state domain
 */

const selectDomain = state => state.get('dashboard') || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Story
 */

const makeSelectDashboardLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.isLoading,
  );

export { makeSelectDashboardLoading };
