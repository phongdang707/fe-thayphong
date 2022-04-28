import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectData = (state) => state.studentDashboard || initialState;

const selectDataConfirmPass = (state) => state.student_profile || initialState;

const makeSelectProfile = () =>
  createSelector(selectData, (dataState) => dataState);

const makeSelectDataConfirmPass = () =>
  createSelector(selectDataConfirmPass, (dataState) => dataState);

export { makeSelectProfile, makeSelectDataConfirmPass };
