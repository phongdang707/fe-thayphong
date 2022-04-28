
import produce from 'immer';
import Types from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  id: '',
  id_exam: '',
  name_exam:"",
  quiz_number:0,
  time:0,
  correct:"",
  score:-1,
  quiz:[],
  result:[],
  page:0,
  showSolution:false,
  open:false,
  isSuffer:false,
  firstClick:0,
};

/* eslint-disable default-case, no-param-reassign */
const studentDashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "next":
            draft.page= draft.page+1;
            break;
          case "back":
            draft.page= draft.page-1;
            break;
          case "show":
            draft.showSolution= true;
            break;
          default:
            break;
        }
        return;
      case Types.INIT:
        draft.loading = true;
        return;
      case Types.INIT_DONE:
        draft.loading = false;
        draft.id = action.payload._id;
        draft.id_exam = action.payload.id_exam;
        draft.name_exam = action.payload.name_exam;
        draft.quiz_number = action.payload.quiz_number;
        draft.time = action.payload.time;
        draft.open = action.payload.openTest;
        draft.isSuffer = action.payload.isSuffer;
        return;INIT_DONE_RESULT
      case Types.INIT_DONE_RESULT:
        draft.loading = false;
        draft.id = action.payload.data._id;
        draft.id_exam = action.payload.data.id_exam;
        draft.name_exam = action.payload.data.name_exam;
        draft.quiz_number = action.payload.data.quiz_number;
        draft.time = action.payload.data.time;
        draft.correct = action.payload.studentData.correct;
        draft.score = action.payload.studentData.score;
        draft.quiz = action.payload.studentData.quiz;
        draft.result = action.payload.studentData.result;
        return;
      case Types.INIT_FAILURE:
        draft.loading = false;
        return;
      case Types.RESET:
        return initialState;
      case Types.OPEN_TEST:
        draft.loading = true;
        draft.firstClick++;
        return ;
    }
  });

export default studentDashboardReducer;
