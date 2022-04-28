import Types from './constants';

export function getContentCourse(payload) {
  return {
    type: Types.CONTENT_GET_CONTENT,
    payload,
  };
}

export function reset(payload) {
  return {
    type: Types.RESET,
    payload,
  };
}

export function getContentSuccess(payload) {
  return {
    type: Types.CONTENT_GET_SUCCESS,
    payload,
  };
}

export function getContentError(payload) {
  return {
    type: Types.CONTENT_GET_FAILURE,
    payload,
  };
}

export function onChange(payload) {
  return {
    type: Types.CONTENT_ONCHANGE,
    payload,
  };
}

export function addContentRequest(payload) {
  return {
    type: Types.CONTENT_ADD_REQUEST,
    payload,
  };
}

export function addSuccess(payload) {
  return {
    type: Types.ADD_CONTENT_SUCCESS,
    payload,
  };
}

export function addError(payload) {
  return {
    type: Types.ADD_CONTENT_FAILURE,
    payload,
  };
}

export function modalOpen(payload) {
  return {
    type: Types.MODAL_OPEN_CONTENT,
    payload,
  };
}

export function modalClose(payload) {
  return {
    type: Types.MODAL_CLOSE_CONTENT,
    payload,
  };
}

export function onDeleteContent(payload) {
  return {
    type: Types.DELETE_CONTENT,
    payload,
  };
}

export function deleteContentSuccess(payload) {
  return {
    type: Types.DELETE_CONTENT_SUCCESS,
    payload,
  };
}

export function deleteContentError(payload) {
  return {
    type: Types.DELETE_CONTENT_ERROR,
    payload,
  };
}

export function onCloseDialog(payload) {
  return {
    type: Types.CONTENT_DIALOG_CLOSE,
    payload,
  };
}

export function onOpenDialog(payload) {
  return {
    type: Types.CONTENT_DIALOG_OPEN,
    payload,
  };
}
