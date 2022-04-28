/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import Types from './constants';
import { setLocalStorage } from '../../services/storage';

// The initial state of the App
export const initialState = {
  firstAndLastName: '',
  loading: false,
  error: false,
  id: '',
  permission: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.LOGIN_REQUEST:
        draft.loading = true;
        return;
      case Types.LOGIN_SUCCESS:
        if (action.payload.permission === 'admin') {
          setLocalStorage('logo', 'logo.png');
        } else {
          setLocalStorage('logo', 'logo.jpg');
        }
        draft.id = action.payload.id;
        draft.permission = action.payload.permission;
        draft.firstAndLastName = action.payload.first_and_last_name;
        draft.loading = false;
        break;
    }
  });

export default loginReducer;
