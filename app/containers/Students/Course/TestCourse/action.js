import Types from "./constants";

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

export function initDoneResult(payload) {
  return {
    type: Types.INIT_DONE_RESULT,
    payload,
  };
}

export function initError(payload) {
  return {
    type: Types.INIT_FAILURE,
    payload,
  };
}

export function onDoTest(payload) {
  return {
    type: Types.OPEN_TEST,
    payload,
  };
}

export function onResumeDoTest(payload) {
  return {
    type: Types.OPEN_TEST_RESUME,
    payload,
  };
}

export function onChange(payload) {
  return {
    type: Types.ONCHANGE,
    payload,
  };
}
