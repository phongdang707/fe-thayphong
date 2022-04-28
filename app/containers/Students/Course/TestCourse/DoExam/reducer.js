
import produce from 'immer';
import Types from './constants';
import { setLocalStorage, getLocalStorage } from "services/storage";

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  id: '',
  quiz_number:0,
  time:0,
  time_start:null,
  quiz:[],
  answer:[],
  page:0,
  firstClick:0
};

/* eslint-disable default-case, no-param-reassign */
const studentDashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.DO_TEST_ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "student_answer":
            draft.answer[action.payload.student_answer.key].answer = action.payload.student_answer.answer;
            setLocalStorage("cacheData",JSON.stringify({id:draft.id,answer:draft.answer }))
            break;
          case "next":
            draft.page= draft.page+1;
            break;
          case "back":
            draft.page= draft.page-1;
            break;
          case "itemQuestion":
            draft.page= (Math.ceil((action.payload.itemQuestion+1)/5) -1) ;
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
        let data = JSON.parse(getLocalStorage("cacheData"));
        if(data && data.id == action.payload._id){
          draft.answer = data.answer;
        }
        draft.id = action.payload._id;
        draft.quiz_number = action.payload.quiz.length;
        draft.time = action.payload.time;
        draft.time_start = action.payload.create_at;
        draft.time = action.payload.time;
        draft.quiz = action.payload.quiz;
        action.payload.quiz.map(item=>{
          draft.answer.push({
            id:item._id,
          })
        })
        return;
      case Types.INIT_FAILURE:
        draft.loading = false;
        return;
      case Types.RESET:
        return initialState;
      case Types.DO_TEST_DONE:
        draft.loading = true;
        draft.firstClick++;
        return;
    }
  });

export default studentDashboardReducer;
