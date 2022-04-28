
import produce from 'immer';
import Types from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  collectionName: "",
  tableName:"",
  headCells:[],
  rows:[],
  page: 0,
  totalItems: 0,
  rowsPerPage: 5,
  searchText:"",
  selectRow:"",
  isSucess: false,
  messageToast: {mess:"",type:"success"},
  openDialogConfirm:false,
  dialogMessage:{title:"", content:""},
  action:""
};

/* eslint-disable default-case, no-param-reassign */
const adminDataReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.ONCHANGE_DATA:
        switch (Object.keys(action.payload)[0]) {
          case "collectionName":
            draft.collectionName = action.payload.collectionName;
            draft.page = 0;
            draft.totalItems = 0;
            draft.row = [];
            draft.searchText = "";
            switch (action.payload.collectionName) {
              case "courses":
                draft.tableName = "Danh sách khóa học";
                draft.headCells = [
                  { id: "1",defaultValue:'name_course', numeric: false, disablePadding: true, label: "Khóa học" , maxWord: 20 },
                  { id: "3",defaultValue:'update_at', numeric: false, disablePadding: true, label: "Ngày xóa", type: 'date' },
                ]
                break;
              case "students":
                draft.tableName = "Danh sách tài khoản";
                draft.headCells = [
                  { id: "1",defaultValue:'full_name', numeric: false, disablePadding: true, label: "Họ tên" , maxWord: 20 },
                  { id: "2",defaultValue:'user_name', numeric: false, disablePadding: true, label: "Tên đăng nhập" , maxWord: 20 },
                  { id: "3",defaultValue:'update_at', numeric: false, disablePadding: true, label: "Ngày xóa", type: 'date' },
                ]
                break;
              case "exams":
                draft.tableName = "Danh sách bài thi";
                draft.headCells = [
                  { id: "1",defaultValue:'name_exam', numeric: false, disablePadding: true, label: "Tên bài thi" , maxWord: 20 },
                  { id: "3",defaultValue:'update_at', numeric: false, disablePadding: true, label: "Ngày xóa", type: 'date' },
                ]
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        return;
      case Types.INIT:
        draft.loading = true;
        return;
      case Types.INIT_DONE:
        draft.rows= action.payload.data;
        draft.totalItems= action.payload.length;
        draft.loading = false;
        return;
      case Types.VIEW_CHANGE_PAGE:
        draft.page = action.payload;
        break;
      case Types.VIEW_CHANGE_ROW:
        draft.rowsPerPage = action.payload;
        draft.page = 0;
        break;
      case Types.VIEW_SEARCH_TEXT:
        draft.page = 0,
        draft.searchText = action.payload;
        break;
      case Types.DATA_ACTION:
        draft.loading = true;
        break;
      case Types.DATA_ACTION_SUCCESS:
        draft.isSucess = true;
        switch (draft.action) {
          case "restore":
            draft.messageToast.type = "success"
            draft.messageToast.mess = "Khôi phục dữ liệu thành công";
            break;
          case "remove":
            draft.messageToast.type = "success"
            draft.messageToast.mess = "Xóa dữ liệu thành công";
            break;
          default:
            break;
        }
        break;
      case Types.RESET:
        return initialState;
      case Types.VIEW_DIALOG_CLOSE:
        draft.openDialogConfirm = false;
        break;
      case Types.VIEW_DIALOG_OPEN:
        draft.selectRow = action.payload.id;
        draft.action = action.payload.name;
        switch (action.payload.name) {
          case "restore":
            draft.dialogMessage = {title:"Khôi phục" , content:"Khôi phục dữ liệu?"}
            break;
          case "remove":
            draft.dialogMessage = {title:"Xác nhận xóa" , content:"Xóa hoàn toàn dữ liệu (không thể khôi phục nữa)?"}
            break;
          default:
            break;
        }
        draft.openDialogConfirm = true;
        break;
    }
  });

export default adminDataReducer;
