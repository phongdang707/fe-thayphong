
import produce from 'immer';
import Types from './constants';
// The initial state of the App
export const initialState = {
  loading: false,
  error: '',
  id: '',
  name_exam:{ error: false, value: "", listErros: "" },
  grade:"",
  activeStep:0,
  helmet:'',
  checkDataInfo:false
};


/* eslint-disable default-case, no-param-reassign */
const addExamReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.ADD_ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "name_exam":
            draft.name_exam.value = action.payload.name_exam;
            if (action.payload.name_exam.length == 0) {
              draft.name_exam.error = true;
              draft.name_exam.listErros = "Tên bài thi không được để trống";
            } else {
              draft.name_exam.error = false;
              draft.name_exam.listErros = "";
            }
            break;
          case "grade":
            draft.grade = action.payload.grade;
            break;
          default:
            break;
        }
        return;
      case Types.ADD_CHANGE_STEP:
        draft.activeStep = action.payload;
        break;
      case Types.ADD_EXAM:
        draft.loading = true;
        draft.name_exam.error = false;
        draft.name_exam.listErros = "";
        break;
      case Types.ADD_EXAM_SUCCESS:
        draft.checkDataInfo = true;
        draft.id = action.payload
        break;
      case Types.ADD_EXAM_FAILURE:
        draft.name_exam.error = true;
        draft.name_exam.listErros = action.payload[0].msg;
        draft.loading = false;
        break;
      case Types.ADD_EXAM_CHANGE_STATE:
        draft.loading = false;
        draft.checkDataInfo = false;
        break;
      case Types.RESET:
        return initialState;
      case Types.INIT:
        draft.loading = true;
        break;
      case Types.INIT_SUCCESS:
        if(action.payload.addExam){
          draft.helmet='Thêm bài kiểm tra';
        }else{
          draft.helmet=`Bài kiểm tra ${action.payload.data.name_exam}`;
          draft.id= action.payload.data._id;
          draft.name_exam.value = action.payload.data.name_exam;
          draft.grade = action.payload.data.grade;
        }
        break;
      case Types.ADD_EXAM_REQUEST:
        draft.loading = true;
        return;
    }
  });

export default addExamReducer;
