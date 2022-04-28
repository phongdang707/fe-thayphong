import Types from "./constants";

export function getDetailCourse(payload) {
  return {
    type: Types.COURSE_GET_DETAIL,
    payload,
  };
}

export function reset(payload) {
  return {
    type: Types.RESET,
    payload,
  };
}

export function getDetailSuccess(payload) {
  return {
    type: Types.DETAIL_GET_SUCCESS,
    payload,
  };
}

export function getDetailError(payload) {
  return {
    type: Types.DETAIL_GET_FAILURE,
    payload,
  };
}

export function viewExamRequest(payload) {
  return {
    type: Types.VIEW_EXAM_REQUEST,
    payload,
  };
}

export function getExamSuccess(payload) {
  return {
    type: Types.DETAIL_GET_EXAM_SUCCESS,
    payload,
  };
}

export function getExamError(payload) {
  return {
    type: Types.DETAIL_GET_EXAM_FAILURE,
    payload,
  };
}

export function onChange(payload) {
  return {
    type: Types.DETAIL_COURSE_ONCHANGE,
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

export function viewExamChangePageTest(payload) {
  return {
    type: Types.VIEW_CHANGE_PAGE_TEST,
    payload,
  };
}

export function viewExamChangeRowTest(payload) {
  return {
    type: Types.VIEW_CHANGE_ROW_TEST,
    payload,
  };
}

export function viewExamChangePageStudent(payload) {
  return {
    type: Types.VIEW_CHANGE_PAGE_STUDENT,
    payload,
  };
}

export function viewExamChangeRowStudent(payload) {
  return {
    type: Types.VIEW_CHANGE_ROW_STUDENT,
    payload,
  };
}

export function viewExamSearchText(payload) {
  return {
    type: Types.VIEW_SEARCH_TEXT,
    payload,
  };
}

export function viewExamSelectRow(payload) {
  return {
    type: Types.VIEW_SELECT_ROW,
    payload,
  };
}

export function onPostNewTest(payload) {
  return {
    type: Types.VIEW_DETAIL_SUBMIT,
    payload,
  };
}

export function postExamSuccess(payload) {
  return {
    type: Types.ADD_TEST_SUCCESS,
    payload,
  };
}

export function postExamError(payload) {
  return {
    type: Types.ADD_TEST_FAILURE,
    payload,
  };
}

export function postChangeStatus(payload) {
  return {
    type: Types.CHANGE_STATUS_COURSE,
    payload,
  };
}

export function postChangeStatusSuccess(payload) {
  return {
    type: Types.CHANGE_STATUS_COURSE_SUCCESS,
    payload,
  };
}

export function postChangeStatusError(payload) {
  return {
    type: Types.CHANGE_STATUS_COURSE_FAILURE,
    payload,
  };
}

export function selectRow(payload) {
  return {
    type: Types.SELECT_ROW_TEST,
    payload,
  };
}

export function selectRowSuccess(payload) {
  return {
    type: Types.SELECT_ROW_TEST_SUCCESS,
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
