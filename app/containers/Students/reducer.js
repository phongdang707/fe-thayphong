/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import history from "utils/history";
import Types from "./constants";
import { mapEntryToFe } from "./utils";
// import history from "history/browser";

// The initial state of the App
export const initialState = {
  firstAndLastName: "",
  loading: false,
  error: false,
  id: "",
  permission: "",
  course: [],
  menuActive: "HOME",
  profile: {},
};

const MAP_HISTORY = {
  HOME: {
    value: "/student",
    key: "HOME",
  },
  COURSE: {
    value: "/student/course",
    key: "COURSE",
  },
  EXAM: {
    value: "/student/exam",
    key: "EXAM",
  },
  PROFILE: {
    value: "/student/profile",
    key: "PROFILE",
  },
};
/* eslint-disable default-case, no-param-reassign */
const studentPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.LOGIN_REQUEST:
        draft.loading = true;
        return;
      case Types.INTI:
        draft.loading = true;
      case Types.INIT_DONE:
        // console.log("22", action.payload);
        draft.profile = mapEntryToFe(action.payload.user);
        draft.loading = false;
        return;
      case Types.SWITCH_MENU:
        // console.log("action.payload", action.payload);
        draft.menuActive = action.payload;
        // if (MAP_HISTORY[action.payload].key == draft.menuActive) {
        // console.log(
        //   "MAP_HISTORY[action.payload].key",
        //   MAP_HISTORY[action.payload].key
        // );
        // console.log("draft.menuActive", draft.menuActive);
        // history.push(`${MAP_HISTORY[action.payload].value}`);
        // }
        return;
    }
  });

export default studentPageReducer;
