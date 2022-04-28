import Types from './constants';

export function onChange(payload) {
  return {
    type: Types.ADD_ONCHANGE,
    payload,
  };
}

export function reset(payload) {
  return {
    type: Types.RESET,
    payload,
  };
}

export function getCurrentAction(payload) {
  return {
    type: Types.INIT,
    payload,
  };
}

export function getCurrentActionSuccess(payload) {
  return {
    type: Types.INIT_SUCCESS,
    payload,
  };
}

export function changeActiveStep(payload) {
  return {
    type: Types.ADD_CHANGE_STEP,
    payload,
  };
}

export function checkDataBeforeNextStep(payload) {
  return {
    type: Types.ADD_EXAM,
    payload,
  };
}

export function addExamSuccess(payload) {
  return {
    type: Types.ADD_EXAM_SUCCESS,
    payload,
  };
}

export function addExamError(payload) {
  return {
    type: Types.ADD_EXAM_FAILURE,
    payload,
  };
}

export function changeStateCheckData(payload) {
  return {
    type: Types.ADD_EXAM_CHANGE_STATE,
    payload,
  };
}

export function addExamRequest(payload) {
  return {
    type: Types.ADD_EXAM_REQUEST,
    payload,
  };
}
