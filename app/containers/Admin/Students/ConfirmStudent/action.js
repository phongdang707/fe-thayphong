import Types from './constants';

export function viewCourseRequest(payload) {
    return {
        type: Types.VIEW_COURSE_REQUEST,
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

export function reset(payload) {
    return {
        type: Types.RESET,
        payload,
    };
}

export function viewCourseChooseItem(payload) {
    return {
        type: Types.VIEW_CHOOSE_ITEMS,
        payload,
    };
}

export function viewCourseDeleteItem(payload) {
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

export function viewCourseSearchText(payload) {
    return {
        type: Types.VIEW_SEARCH_TEXT,
        payload,
    };
}

export function viewCourseSelectRow(payload) {
    return {
        type: Types.VIEW_SELECT_ROW,
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

export function downloadFile(payload) {
    return {
        type: Types.DOWNLOAD_FILE,
        payload,
    };
}

export function downloadFileDone(payload) {
    return {
        type: Types.DOWNLOAD_FILE_DONE,
        payload,
    };
}

export function onConfirmStudent(payload) {
    return {
        type: Types.CONFIRM_STUDENT,
        payload,
    };
}

export function onRefuseStudent(payload) {
    return {
        type: Types.REFUSE_STUDENT,
        payload,
    };
}
