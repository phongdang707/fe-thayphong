import Types from './constants';

export function onChange(payload) {
  return {
    type: Types.ADD_ONCHANGE,
    payload,
  };
}

export function getQuizExam(payload) {
  return {
    type: Types.EXAM_GET_QUIZ,
    payload,
  };
}

export function getQuizSuccess(payload) {
  return {
    type: Types.QUIZ_GET_SUCCESS,
    payload,
  };
}

export function getQuizError(payload) {
  return {
    type: Types.QUIZ_GET_FAILURE,
    payload,
  };
}

export function reset(payload) {
  return {
    type: Types.RESET,
    payload,
  };
}

export function modalOpen(payload) {
  return {
    type: Types.MODAL_OPEN_QUIZ,
    payload,
  };
}

export function modalClose(payload) {
  return {
    type: Types.MODAL_CLOSE_QUIZ,
    payload,
  };
}

export function addQuizRequest(payload) {
  return {
    type: Types.QUIZ_ADD_REQUEST,
    payload,
  };
}

export function addSuccess(payload) {
  return {
    type: Types.ADD_QUIZ_SUCCESS,
    payload,
  };
}

export function addError(payload) {
  return {
    type: Types.ADD_QUIZ_FAILURE,
    payload,
  };
}

export function onDeleteQuiz(payload) {
  return {
    type: Types.DELETE_QUIZ,
    payload,
  };
}

export function deleteQuizSuccess(payload) {
  return {
    type: Types.DELETE_QUIZ_SUCCESS,
    payload,
  };
}

export function deleteQuizError(payload) {
  return {
    type: Types.DELETE_QUIZ_ERROR,
    payload,
  };
}

export function onCloseDialog(payload) {
  return {
    type: Types.QUIZ_DIALOG_CLOSE,
    payload,
  };
}

export function onOpenDialog(payload) {
  return {
    type: Types.QUIZ_DIALOG_OPEN,
    payload,
  };
}
