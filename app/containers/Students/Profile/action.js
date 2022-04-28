import Types from "./constants";

// export function loginRequest(payload) {
//   return {
//     type: Types.LOGIN_REQUEST,
//     payload,
//   };
// }

export function onChange(payload) {
  return {
    type: Types.ON_CHANGE,
    payload,
  };
}

export function updatePassword(payload) {
  return {
    type: Types.UPDATE_PASSWORD,
    payload,
  };
}

export function onSucess(payload) {
  return {
    type: Types.CHANGE_PASS_SUCCESS,
    payload,
  };
}

export function onError(payload) {
  return {
    type: Types.CHANGE_PASS_ERRORS,
    payload,
  };
}
