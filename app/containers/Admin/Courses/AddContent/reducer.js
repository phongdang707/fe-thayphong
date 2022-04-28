
import produce from 'immer';
import Types from './constants';
// The initial state of the App
export const initialState = {
  loading: false,
  loadingModal:false,
  error: '',
  id: '',
  name_course:'',
  page:0,
  totalItems:0,
  rowsPerPage:5,
  content_list: [],
  id_content:'',
  title:{ error: false, value: "", listErros: "" },
  chapter:{ error: false, value: "", listErros: "" },
  content:"",
  link_file:"",
  helmet:'',
  isSucess:false,
  messageToast: {mess:"",type:"success"},
  openDialogConfirm:false,
  itemSelected:""
};


/* eslint-disable default-case, no-param-reassign */
const addContentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.CONTENT_ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "title":
            draft.title.value = action.payload.title;
            if (action.payload.title.length == 0) {
              draft.title.error = true;
              draft.title.listErros = "Tiêu đề không được để trống";
            } else {
              draft.title.error = false;
              draft.title.listErros = "";
            }
            break;
          case "chapter":
            draft.chapter.value = action.payload.chapter;
            if (action.payload.chapter.length == 0 || action.payload.chapter <= 0) {
              draft.chapter.error = true;
              draft.chapter.listErros = "Số chương không hợp lệ";
            } else {
              draft.chapter.error = false;
              draft.chapter.listErros = "";
            }
            break;
          case "content":
            draft.content = action.payload.content;
            break;
          case "link_file":
            draft.link_file = action.payload.link_file;
            break;
          case "next":
            draft.page= draft.page+1;
            break;
          case "back":
            draft.page= draft.page-1;
            break;
          case "changeItem":
            draft.rowsPerPage= action.payload.changeItem;
            draft.page = 0;
            break;
          default:
            break;
        }
        return;
      case Types.CONTENT_GET_CONTENT:
        draft.loading = true;
        draft.error = '';
        return;
      case Types.RESET:
        return initialState;
      case Types.CONTENT_GET_SUCCESS:
        draft.loading = false;
        draft.helmet=`Khóa học ${action.payload.data.name_course}`;
        draft.id = action.payload.data._id
        draft.name_course = action.payload.data.name_course;
        let arr = [];
        action.payload.data.contents.map(item=>{
          if(arr[item.chapter-1])
            arr[item.chapter-1].push(item)
          else{
            arr[item.chapter-1] = [];
            arr[item.chapter-1].push(item);
          }
        })
        draft.content_list = arr;
        draft.totalItems = action.payload.length;
        return ;
      case Types.CONTENT_GET_FAILURE:
        return ;
      case Types.CONTENT_ADD_REQUEST:
        draft.loadingModal = true;
        return ;
      case Types.ADD_CONTENT_SUCCESS:
        draft.loadingModal = false;
        draft.messageToast.type= 'success';
        draft.id_content?draft.messageToast.mess = "Chỉnh sửa thành công ":draft.messageToast.mess = "Thêm thành công";
        draft.isSucess = true;
        return ;
      case Types.ADD_CONTENT_FAILURE:
        // draft.messageToast.type= 'error';
        // draft.messageToast.mess = "Thêm thất bại";
        draft.loadingModal = false;
        return ;
      case Types.MODAL_OPEN_CONTENT:
        if(action.payload){
          draft.id_content = action.payload._id;
          draft.title.value = action.payload.title;
          draft.chapter.value = action.payload.chapter;
          draft.content = action.payload.content;
          draft.link_file = action.payload.link_file;
        }
        return ;
      case Types.MODAL_CLOSE_CONTENT:
        draft.id_content = "";
        draft.title = { error: false, value: "", listErros: "" };
        draft.chapter = { error: false, value: "", listErros: "" };
        draft.content = "";
        draft.link_file = "";
        return ;
      case Types.DELETE_CONTENT:
        draft.loading = true;
        return ;
      case Types.DELETE_CONTENT_SUCCESS:
        draft.loading = false;
        draft.messageToast.type= 'success';
        draft.messageToast.mess = "Xóa thành công";
        draft.isSucess = true;
        return ;
      case Types.DELETE_CONTENT_ERROR:
        // draft.messageToast.type= 'error';
        // draft.messageToast.mess = "Xpá thất bại";
        draft.loading = false;
        return ;
      case Types.CONTENT_DIALOG_CLOSE:
        draft.openDialogConfirm = false;
        break;
      case Types.CONTENT_DIALOG_OPEN:
        draft.itemSelected = action.payload;
        draft.openDialogConfirm = true;
        break;
    }
  });

export default addContentReducer;
