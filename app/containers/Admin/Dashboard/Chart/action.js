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

export function onChange(payload) {
  return {
    type: Types.ONCHANGE_DASHBOARD,
    payload,
  };
}

export function getResult(payload) {
  return {
    type: Types.GET_RESULT_DASHBOARD,
    payload,
  };
}

export function getResultSuccess(payload) {
  return {
    type: Types.GET_RESULT_DASHBOARD_DONE,
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

export function onRemoveData(payload) {
  return {
    type: Types.REMOVEW_DATA,
    payload,
  };
}

export function removeDataSuccess(payload) {
  return {
    type: Types.REMOVEW_DATA_SUCCESS,
    payload,
  };
}
