import Types from './constants';

export function viewExamRequest(payload) {
  return {
    type: Types.VIEW_EXAM_REQUEST,
    payload,
  };
}

export function viewSuccess(payload) {
  return {
    type: Types.VIEW_SUCCESS,
    payload,
  };
}

export function viewError(payload) {
  return {
    type: Types.VIEW_FAILURE,
    payload,
  };
}

export function viewExamChangePage(payload) {
  return {
    type: Types.VIEW_CHANGE_PAGE,
    payload,
  };
}

export function viewExamChangeRow(payload) {
  return {
    type: Types.VIEW_CHANGE_ROW,
    payload,
  };
}

export function viewExamChooseItem(payload) {
  return {
    type: Types.VIEW_CHOOSE_ITEMS,
    payload,
  };
}

export function viewExamDeleteItem(payload) {
  return {
    type: Types.VIEW_DELETE_ITEMS,
    payload,
  };
}

export function viewDeleteSuccess(payload) {
  return {
    type: Types.VIEW_DELETE_SUCCESS,
    payload,
  };
}

export function viewDeleteError(payload) {
  return {
    type: Types.VIEW_DELETE_FAILURE,
    payload,
  };
}

export function viewExamSearchText(payload) {
  return {
    type: Types.VIEW_SEARCH_TEXT,
    payload,
  };
}

export function viewExamSelectEdit(payload) {
  return {
    type: Types.VIEW_SELECT_EDIT,
    payload,
  };
}

export function viewExamSelectRow(payload) {
  return {
    type: Types.VIEW_SELECT_ROW,
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

export function onChange(payload) {
  return {
    type: Types.VIEW_ONCHANGE,
    payload,
  };
}
