import Types from './constants';

export function addCourseRequest(payload) {
  return {
    type: Types.ADD_COURSE_REQUEST,
    payload,
  };
}

export function addSuccess(payload) {
  return {
    type: Types.ADD_SUCCESS,
    payload,
  };
}

export function addError(payload) {
  return {
    type: Types.ADD_FAILURE,
    payload,
  };
}

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

export function viewCourseChooseItem(payload) {
  return {
    type: Types.VIEW_CHOOSE_ITEMS,
    payload,
  };
}

export function checkDataBeforeNextStep(payload) {
  return {
    type: Types.ADD_CHECK_INFO,
    payload,
  };
}

export function checkDataSuccess(payload) {
  return {
    type: Types.ADD_CHECK_INFO_SUCCESS,
    payload,
  };
}

export function checkDataError(payload) {
  return {
    type: Types.ADD_CHECK_INFO_FAILURE,
    payload,
  };
}

export function changeStateCheckData(payload) {
  return {
    type: Types.ADD_CHECK_INFO_CHANGE_STATE,
    payload,
  };
}
