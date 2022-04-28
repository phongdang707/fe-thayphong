import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectAddStudent = (state) => state.studentRegister || initialState;

const makeSelectFormAddStudent = () =>
  createSelector(selectAddStudent, (infoState) => infoState);

export { makeSelectFormAddStudent };
