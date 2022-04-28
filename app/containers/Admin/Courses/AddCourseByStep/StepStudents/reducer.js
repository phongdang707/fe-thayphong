
import produce from 'immer';
import Types from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: '',
  tableName:'Thêm học sinh vào khóa học',
  selected: [],
  page:0,
  totalItems:0,
  rowsPerPage:5,
  headCells:[
    {
      id: "1",
      defaultValue: "full_name",
      numeric: false,
      disablePadding: true,
      label: "Tên học sinh",
      maxWord:20,
    },
    {
      id: "3",
      defaultValue: "school",
      numeric: false,
      disablePadding: true,
      label: "Trường",
      maxWord:20,
    },
    {
      id: "4",
      defaultValue: "grade",
      numeric: false,
      disablePadding: true,
      label: "Khối",
    },
    {
      id: "5",
      defaultValue: "class_room",
      numeric: false,
      disablePadding: true,
      label: "Lớp",
    },
  ],
  rows:[],
  searchText:'',
  gradeTab:0,
  grade:"10",
};

/* eslint-disable default-case, no-param-reassign */
const addCourseReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.VIEW_ONCHANGE:
        draft.gradeTab = action.payload;
        switch (action.payload) {
          case 0:
            draft.grade = "10";
            break;
          case 1:
            draft.grade = "11";
            break;
          case 2:
            draft.grade = "12";
            break;
          default:
            break;
        }
        return;
      case Types.VIEW_STUDENT_REQUEST:
        draft.loading = true;
        return;
      case Types.VIEW_SUCCESS:
        draft.rows = action.payload.data;
        draft.totalItems = action.payload.length;
        draft.loading = false;
        break;
      case Types.VIEW_CHANGE_PAGE:
        draft.page = action.payload;
        break;
      case Types.VIEW_CHANGE_ROW:
        draft.rowsPerPage = action.payload;
        draft.page = 0;
        break;
      case Types.VIEW_GET_SELECTED:
        draft.selected = action.payload;
        break;
      // case Types.VIEW_CHOOSE_ITEMS:
      //   draft.selected = action.payload;
      //   break;
      case Types.VIEW_SEARCH_TEXT:
        draft.page = 0,
        draft.searchText = action.payload;
        break;
    }
  });

export default addCourseReducer;
