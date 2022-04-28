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

export function viewChangePage(payload) {
  return {
    type: Types.VIEW_CHANGE_PAGE,
    payload,
  };
}

export function viewChangeRow(payload) {
  return {
    type: Types.VIEW_CHANGE_ROW,
    payload,
  };
}
