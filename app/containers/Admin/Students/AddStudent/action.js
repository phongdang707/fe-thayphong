import Types from "./constants";

export function onChange(payload) {
  return {
    type: Types.ONCHANGE,
    payload,
  };
}

export function onSubmit(payload) {
  return {
    type: Types.SUBMIT_ADD_STUDENT,
    payload,
  };
}

export function onSucess(payload) {
  return {
    type: Types.SUBMIT_ADD_STUDENT_DONE,
    payload,
  };
}

export function onError(payload) {
  return {
    type: Types.SUBMIT_ADD_STUDENT_ERROR,
    payload,
  };
}

export function onReset(payload) {
  return {
    type: Types.RESET,
    payload,
  };
}

export function init(payload) {
  return {
    type: Types.INIT,
    payload,
  };
}
export function initDone(payload) {
  return {
    type: Types.INIT_DONE,
    payload,
  };
}
export function updatePassword(payload) {
  return {
    type: Types.UPDATE_PASSWORD,
    payload,
  };
}

export function updateInfo(payload) {
  return {
    type: Types.UPDATE_STUDENT,
    payload,
  };
}
