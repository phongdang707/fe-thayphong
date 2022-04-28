/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import Types from './constants';
// The initial state of the App
export const initialState = {
  loading: false,
  error: '',
  id: '',
  selected: [],
  name_course:{ error: false, value: "", listErros: "" },
  grade:{ error: false, value: "", listErros: "" },
  description:{ error: false, value: "", listErros: "" },
  imgData:null,
  imgPreview:'',
  activeStep:0,
  helmet:'',
  buttonName:'',
  checkDataInfo:false,
  isSucess: false,
  messageToast: {mess:"",type:"success"}
};


/* eslint-disable default-case, no-param-reassign */
const addCourseReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.ADD_ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "name_course":
            draft.name_course.value = action.payload.name_course;
            if (action.payload.name_course.trim().length == 0) {
              draft.name_course.error = true;
              draft.name_course.listErros = "Tên khóa học không được để trống";
            } else {
              draft.name_course.error = false;
              draft.name_course.listErros = "";
            }
            break;
          case "grade":
            draft.grade.value = action.payload.grade;
            break;
          case "description":
            draft.description.value = action.payload.description;
            break;
          case "imgData":
            draft.imgData = action.payload.imgData;
            draft.imgPreview = action.payload.imgPreview;
            break;
          default:
            break;
        }
        return;
      case Types.ADD_COURSE_REQUEST:
        draft.loading = true;
        draft.error = '';
        return;
      case Types.ADD_SUCCESS:
        draft.isSucess = true;
        draft.messageToast.type = "success"
        draft.id?draft.messageToast.mess = "Sửa khóa học thành công":draft.messageToast.mess = "Thêm khóa học thành công";
        break;
      case Types.ADD_FAILURE:
        draft.error = action.payload;
        draft.messageToast.type = "error";
        draft.messageToast.mess = "Thêm thất bại"
        break;
      case Types.VIEW_CHOOSE_ITEMS:
        draft.selected = action.payload;
        break;
      case Types.RESET:
        return initialState;
      case Types.INIT:
        draft.loading = true;
        break;
      case Types.INIT_SUCCESS:
        draft.loading=false;
        if(action.payload.addCourse){
          draft.helmet='Thêm khóa học';
          draft.buttonName='Tạo';
        }else{
          draft.helmet=`Khóa học ${action.payload.data.name_course}`;
          draft.buttonName='Sửa';
          draft.id= action.payload.data._id;
          draft.name_course.value = action.payload.data.name_course;
          draft.grade.value = action.payload.data.grade;
          draft.description.value = action.payload.data.description;
          draft.selected = action.payload.data.students;
          draft.imgPreview=action.payload.data.banner;
        }
        break;
      case Types.ADD_CHANGE_STEP:
        draft.activeStep = action.payload;
        break;
      case Types.ADD_CHECK_INFO:
        draft.loading = true;
        draft.name_course.error = false;
        draft.name_course.listErros = "";
        break;
      case Types.ADD_CHECK_INFO_SUCCESS:
        draft.checkDataInfo = true;
        break;
      case Types.ADD_CHECK_INFO_FAILURE:
        draft.name_course.error = true;
        draft.name_course.listErros = action.payload[0].msg;
        draft.loading = false;
        break;
      case Types.ADD_CHECK_INFO_CHANGE_STATE:
        draft.loading = false;
        draft.checkDataInfo = false;
        break;
    }
  });

export default addCourseReducer;
