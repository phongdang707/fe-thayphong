/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import Types from "./constants";
import { mapValid } from "./utils";

// The initial state of the App
export const initialState = {
  password: { error: null, value: "", listErros: [], validate: true },
  confirmPassword: { error: null, value: "", listErros: [], validate: true },
  disableUpdatePassword: true,
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.ON_CHANGE:
        if (Object.keys(action.payload)[0] === "password") {
          let errorsPassword = mapValid(["required"], action.payload.password);
          if (errorsPassword.length > 0) {
            draft.password.error = true;
            draft.password.listErros = errorsPassword;
          } else {
            draft.password.error = false;
            draft.password.listErros = [];
          }
          draft.password.value = action.payload.password;
        } else {
          let errorsConfirmPassword = mapValid(
            ["required", "confirmPassword"],
            action.payload.confirmPassword,
            draft.password.value
          );
          if (errorsConfirmPassword.length > 0) {
            draft.confirmPassword.error = true;
            draft.confirmPassword.listErros = errorsConfirmPassword;
          } else {
            draft.confirmPassword.error = false;
            draft.confirmPassword.listErros = [];
          }
          draft.confirmPassword.value = action.payload.confirmPassword;
        }
        const listError = [draft.confirmPassword.error, draft.password.error];

        if (listError.every((e) => e === false)) {
          draft.disableUpdatePassword = false;
        } else {
          draft.disableUpdatePassword = true;
        }
        break;
      case Types.CHANGE_PASS_SUCCESS: {
        draft.isLoading = false;
        return;
      }
      case Types.CHANGE_PASS_ERRORS: {
        draft.isLoading = false;
        return;
      }
      case Types.RESET: {
        return initialState;
      }
      case Types.UPDATE_PASSWORD: {
        draft.isLoading = true;
        return;
      }
    }
  });

export default loginReducer;
