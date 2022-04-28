import Types from "./constants";

export function onChange(payload) {
  return {
    type: Types.ONCHANGE_DATA,
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

export function viewSearchText(payload) {
  return {
    type: Types.VIEW_SEARCH_TEXT,
    payload,
  };
}

export function dataAction(payload) {
  return {
    type: Types.DATA_ACTION,
    payload,
  };
}

export function restoreDataSuccess(payload) {
  return {
    type: Types.DATA_ACTION_SUCCESS,
    payload,
  };
}

export function reset(payload) {
  return {
    type: Types.RESET,
    payload,
  };
}

export function onCloseDialog(payload) {
  return {
    type: Types.VIEW_DIALOG_CLOSE,
    payload,
  };
}

export function onOpenDialog(payload) {
  return {
    type: Types.VIEW_DIALOG_OPEN,
    payload,
  };
}
