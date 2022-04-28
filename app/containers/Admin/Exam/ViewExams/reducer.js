
import produce from 'immer';
import Types from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: '',
  tableName:'Danh sách đề thi',
  selected: [],
  page:0,
  totalItems:0,
  rowsPerPage:5,
  headCells:[
    { id: "1",defaultValue:'name_exam', numeric: false, disablePadding: true, label: "Tên bài thi" , maxWord: 20  },
    { id: "3",defaultValue:'quiz', numeric: false, disablePadding: true, label: "Số câu hỏi", type:'number' },
    { id: "4",defaultValue:'create_at', numeric: false, disablePadding: true, label: "Ngày tạo" ,type: 'date'},
  ],
  rows:[],
  searchText:'',
  isSucess: false,
  messageToast: {mess:"",type:"success"},
  openDialogConfirm:false,
  gradeTab:0,
  grade:"10",
};

/* eslint-disable default-case, no-param-reassign */
const viewExamReducer = (state = initialState, action) =>
  produce(state, draft => {
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
      case Types.VIEW_EXAM_REQUEST:
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
      case Types.VIEW_CHOOSE_ITEMS:
        draft.selected = action.payload;
        break;
      case Types.VIEW_DELETE_ITEMS:
        draft.loading = true;
        break;
      case Types.VIEW_DELETE_SUCCESS:
        draft.isSucess = true;
        draft.messageToast.type = "success"
        draft.messageToast.mess = "Xóa bài thi thành công";
        break;
      case Types.VIEW_SEARCH_TEXT:
        draft.page = 0,
        draft.searchText = action.payload;
        break;
      case Types.VIEW_SELECT_EDIT:
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
        break;
    }
  });

export default viewExamReducer;
