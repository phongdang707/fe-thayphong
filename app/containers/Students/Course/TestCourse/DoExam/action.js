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

export function initError(payload) {
  return {
    type: Types.INIT_FAILURE,
    payload,
  };
}

export function onChange(payload) {
  return {
    type: Types.DO_TEST_ONCHANGE,
    payload,
  };
}

export function onSubmit(payload) {
  return {
    type: Types.DO_TEST_DONE,
    payload,
  };
}
