
import produce from 'immer';
import Types from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  headCells:[
    { id: "5",defaultValue:'course_name', numeric: false, disablePadding: true, label: "Khóa học" , maxWord: 20 },
    { id: "1",defaultValue:'exam_name', numeric: false, disablePadding: true, label: "Tên bài thi" , maxWord: 20},
    { id: "2",defaultValue:'correct', numeric: false, disablePadding: true, label: "Câu đúng" },
    { id: "3",defaultValue:'score', numeric: false, disablePadding: true, label: "Số điểm", type: 'customScore'},
    { id: "4",defaultValue:'create_at', numeric: false, disablePadding: true, label: "Ngày thi" ,type: 'date'},
  ],
  rows:[],
  page: 0,
  totalItems: 0,
  rowsPerPage: 5,
};

/* eslint-disable default-case, no-param-reassign */
const studentResultExamReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.INIT:
        draft.loading = true;
        return;
      case Types.INIT_DONE:
        draft.loading = false;
        draft.rows= action.payload.data;
        draft.totalItems = action.payload.length;
        return;
      case Types.RESET:
        return initialState;
      case Types.VIEW_CHANGE_PAGE:
        draft.page = action.payload;
        break;
      case Types.VIEW_CHANGE_ROW:
        draft.rowsPerPage = action.payload;
        draft.page = 0;
        break;
    }
  });

export default studentResultExamReducer;
