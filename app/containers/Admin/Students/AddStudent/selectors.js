import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectAddStudent = (state) => state.student || initialState;

const makeSelectFormAddStudent = () =>
  createSelector(selectAddStudent, (infoState) => infoState);

export { makeSelectFormAddStudent };
