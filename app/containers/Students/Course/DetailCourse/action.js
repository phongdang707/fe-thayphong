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

export function onClick(payload) {
  return {
    type: Types.OPEN_TEST,
    payload,
  };
}
