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

export function getDetailCourse(payload) {
  return {
    type: Types.DETAIL_COURSE,
    payload,
  };
}
