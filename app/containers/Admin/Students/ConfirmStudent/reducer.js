import produce from "immer";
import Types from "./constants";

// The initial state of the App
export const initialState = {
    loading: false,
    error: "",
    tableName: "Danh sách học sinh yêu cầu đăng ký tài khoản",
    selected: [],
    page: 0,
    totalItems: 0,
    rowsPerPage: 5,
    headCells: [
        {
            id: "1",
            defaultValue: "full_name",
            numeric: false,
            disablePadding: true,
            label: "Tên học sinh",
            maxWord: 30
        },
        {
            id: "2",
            defaultValue: "user_name",
            numeric: false,
            disablePadding: true,
            label: "Tên tài khoản",
            maxWord: 30
        },
        {
            id: "3",
            defaultValue: "school",
            numeric: false,
            disablePadding: true,
            label: "Trường",
            maxWord: 30
        },
        {
            id: "4",
            defaultValue: "grade",
            numeric: false,
            disablePadding: true,
            label: "Khối",
            maxWord: 30
        },
        {
            id: "5",
            defaultValue: "phong_number_family",
            numeric: false,
            disablePadding: true,
            label: "SĐT phụ huynh",
        },
    ],
    rows: [],
    searchText: "",
    messageToast: {mess: "", type: "success"},
    openDialogConfirm: false,
    gradeTab: 0,
    grade: "10",
};

/* eslint-disable default-case, no-param-reassign */
const viewCourseReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case Types.VIEW_ONCHANGE:
                draft.gradeTab = action.payload;
                switch (action.payload) {
                    case 0:
                        draft.grade = "10";
                        draft.rowsPerPage = 5;
                        draft.page = 0;
                        draft.searchText = "";
                        break;
                    case 1:
                        draft.grade = "11";
                        draft.rowsPerPage = 5;
                        draft.page = 0;
                        draft.searchText = "";
                        break;
                    case 2:
                        draft.grade = "12";
                        draft.rowsPerPage = 5;
                        draft.page = 0;
                        draft.searchText = "";
                        break;
                    default:
                        break;
                }
                return;
            case Types.VIEW_COURSE_REQUEST:
                draft.loading = true;
                return;
            case Types.VIEW_SUCCESS:
                draft.rows = action.payload.data;
                draft.totalItems = action.payload.length;
                draft.loading = false;
                // return {
                //   ...state,
                //   addStudent: addStudentReducer(
                //     state,
                //     "RESET"
                //   ),
                // };
                break;
            case Types.VIEW_CHANGE_PAGE:
                draft.page = action.payload;
                break;
            case Types.VIEW_CHANGE_ROW:
                draft.rowsPerPage = action.payload;
                draft.page = 0;
                break;
            case Types.VIEW_CHOOSE_ITEMS:
                draft.selected = action.payload;
                break;
            case Types.VIEW_DELETE_ITEMS:
                draft.loading = true;
                break;
            case Types.VIEW_DELETE_SUCCESS:
                draft.isSucess = true;
                draft.messageToast.type = "success"
                draft.messageToast.mess = "Xóa học sinh thành công";
                break;
            case Types.VIEW_SEARCH_TEXT:
                (draft.page = 0), (draft.searchText = action.payload);
                break;
            case Types.VIEW_SELECT_ROW:
                break;
            case Types.RESET:
                return initialState;
            case Types.VIEW_DIALOG_CLOSE:
                draft.openDialogConfirm = false;
                break;
            case Types.VIEW_DIALOG_OPEN:
                draft.openDialogConfirm = true;
                break
            case Types.DOWNLOAD_FILE:
                draft.loading = true;
                break
            case Types.DOWNLOAD_FILE_DONE:
                draft.loading = false;
                break;
            case Types.CONFIRM_STUDENT:
                draft.loading = true;
                break;

            case Types.CONFIRM_STUDENT_DONE:
                draft.loading = false;
                break;
            case Types.REFUSE_STUDENT:
                draft.loading = true;
                break;
            case Types.REFUSE_STUDENT_DONE:
                draft.loading = false;
                break;
        }
    });

export default viewCourseReducer;
