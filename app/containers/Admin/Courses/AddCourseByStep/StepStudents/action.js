import Types from './constants';

export function viewCourseRequest(payload) {
  return {
    type: Types.VIEW_STUDENT_REQUEST,
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

export function viewCourseChangePage(payload) {
  return {
    type: Types.VIEW_CHANGE_PAGE,
    payload,
  };
}

export function viewCourseChangeRow(payload) {
  return {
    type: Types.VIEW_CHANGE_ROW,
    payload,
  };
}

// export function viewCourseChooseItem(payload) {
//   return {
//     type: Types.VIEW_CHOOSE_ITEMS,
//     payload,
//   };
// }
export function getSelected(payload) {
  return {
    type: Types.VIEW_GET_SELECTED,
    payload,
  };
}

export function viewCourseSearchText(payload) {
  return {
    type: Types.VIEW_SEARCH_TEXT,
    payload,
  };
}

export function onChange(payload) {
  return {
    type: Types.VIEW_ONCHANGE,
    payload,
  };
}
