
import produce from 'immer';
import Types from './constants';
// The initial state of the App
export const initialState = {
  loading: false,
  loadingModal:false,
  error: '',
  id: '',
  id_question:"",
  page:0,
  totalItems:0,
  rowsPerPage:5,
  quiz_list:[],
  handleAdd:false,
  question:{ error: false, value: "", listErros: "" },
  answer_a:{ error: false, value: "", listErros: "" },
  answer_b:{ error: false, value: "", listErros: "" },
  answer_c:{ error: false, value: "", listErros: "" },
  answer_d:{ error: false, value: "", listErros: "" },
  correct_answer: "",
  solution:"",
  isSucess:false,
  messageToast: {mess:"",type:"success"},
  openDialogConfirm:false,
  itemSelected:""
};


/* eslint-disable default-case, no-param-reassign */
const addQuizReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.ADD_ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "id":
            draft.id = action.payload.id;
            break;
          case "question":
            draft.question.value = action.payload.question;
            if (action.payload.question.length == 0) {
              draft.question.error = true;
              draft.question.listErros = "Câu hỏi không được để trống";
            } else {
              draft.question.error = false;
              draft.question.listErros = "";
            }
            break;
          case "answer_a":
            draft.answer_a.value = action.payload.answer_a;
            if (action.payload.answer_a.length == 0) {
              draft.answer_a.error = true;
              draft.answer_a.listErros = "Câu trả lời không được để trống";
            } else {
              draft.answer_a.error = false;
              draft.answer_a.listErros = "";
            }
            break;
          case "answer_b":
            draft.answer_b.value = action.payload.answer_b;
            if (action.payload.answer_b.length == 0) {
              draft.answer_b.error = true;
              draft.answer_b.listErros = "Câu trả lời không được để trống";
            } else {
              draft.answer_b.error = false;
              draft.answer_b.listErros = "";
            }
            break;
          case "answer_c":
            draft.answer_c.value = action.payload.answer_c;
            if (action.payload.answer_c.length == 0) {
              draft.answer_c.error = true;
              draft.answer_c.listErros = "Câu trả lời không được để trống";
            } else {
              draft.answer_c.error = false;
              draft.answer_c.listErros = "";
            }
            break;
          case "answer_d":
            draft.answer_d.value = action.payload.answer_d;
            if (action.payload.answer_d.length == 0) {
              draft.answer_d.error = true;
              draft.answer_d.listErros = "Câu trả lời không được để trống";
            } else {
              draft.answer_d.error = false;
              draft.answer_d.listErros = "";
            }
            break;
          case "correct_answer":
            draft.correct_answer = action.payload.correct_answer;
            break;
          case "solution":
            draft.solution = action.payload.solution;
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
      case Types.EXAM_GET_QUIZ:
        draft.loading = true;
        draft.error = '';
        return;
      case Types.RESET:
        return initialState;
      case Types.QUIZ_GET_SUCCESS:
        draft.loading = false;
        draft.id = action.payload.data._id;
        draft.quiz_list= action.payload.data.quiz;
        draft.totalItems = action.payload.length;
        return ;
      case Types.QUIZ_GET_FAILURE:
        draft.loading = false;
        return ;
      case Types.MODAL_OPEN_QUIZ:
        draft.handleAdd = true;
        if(action.payload){
          draft.id_question = action.payload._id;
          draft.question.value = action.payload.question;
          draft.answer_a.value = action.payload.answer_a.text;
          draft.answer_b.value = action.payload.answer_b.text;
          draft.answer_c.value = action.payload.answer_c.text;
          draft.answer_d.value = action.payload.answer_d.text;
          draft.correct_answer =  action.payload.correct_answer.text;
          draft.solution =  action.payload.solution;
        }
        return ;
      case Types.MODAL_CLOSE_QUIZ:
        draft.handleAdd = false;
        draft.id_question = "";
        draft.question={ error: false, value: "", listErros: "" };
        draft.answer_a={ error: false, value: "", listErros: "" };
        draft.answer_b={ error: false, value: "", listErros: "" };
        draft.answer_c={ error: false, value: "", listErros: "" };
        draft.answer_d={ error: false, value: "", listErros: "" };
        draft.correct_answer= "";
        draft.solution= "";
        return ;
      case Types.QUIZ_ADD_REQUEST:
        draft.loadingModal = true;
        return ;
      case Types.ADD_QUIZ_SUCCESS:
        draft.loadingModal = false;
        draft.messageToast.type= 'success';
        draft.id_question?draft.messageToast.mess = "Chỉnh sửa thành công ":draft.messageToast.mess = "Thêm thành công";
        draft.isSucess = true;
        return ;
      case Types.ADD_QUIZ_FAILURE:
        draft.loadingModal = false;
        return ;
      case Types.DELETE_QUIZ:
        draft.loading = true;
        return ;
      case Types.DELETE_QUIZ_SUCCESS:
        draft.loading = false;
        draft.messageToast.type= 'success';
        draft.messageToast.mess = "Xóa thành công";
        draft.isSucess = true;
        return ;
      case Types.DELETE_QUIZ_ERROR:
        draft.loading = false;
        return ;
      case Types.QUIZ_DIALOG_CLOSE:
        draft.openDialogConfirm = false;
        break;
      case Types.QUIZ_DIALOG_OPEN:
        draft.itemSelected = action.payload;
        draft.openDialogConfirm = true;
        break;
    }
  });

export default addQuizReducer;
