import Types from './constants';

export function loginRequest(payload) {
  return {
    type: Types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: Types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginError(payload) {
  return {
    type: Types.LOGIN_FAILURE,
    payload,
  };
}

export function updateLoadingLogin(payload) {
  return {
    type: Types.UPDATE_LOADING_LOGIN,
    payload,
  };
}

export function logout() {
  return {
    type: Types.LOGOUT,
  };
}

export function onChange() {
  return {
    type: Types.ON_CHANGE,
  };
}
