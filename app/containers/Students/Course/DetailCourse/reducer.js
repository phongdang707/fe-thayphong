
import produce from 'immer';
import Types from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  id: '',
  name_course:"",
  test:[],
  contents:[],
  banner:"",
  description:""
};

/* eslint-disable default-case, no-param-reassign */
const studentCourseReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.INIT:
        draft.loading = true;
        return;
      case Types.INIT_DONE:
        draft.loading = false;
        draft.id = action.payload._id;
        draft.name_course = action.payload.name_course;
        draft.test = action.payload.exams;
        let arr = [];
        action.payload.contents.map(item=>{
          if(arr[item.chapter-1])
            arr[item.chapter-1].push(item)
          else{
            arr[item.chapter-1] = [];
            arr[item.chapter-1].push(item);
          }
        })
        draft.contents = arr;
        draft.banner = action.payload.banner;
        draft.description = action.payload.description;
        return;
      case Types.INIT_FAILURE:
        draft.loading = false;
        return;
      case Types.RESET:
        return initialState;
      case Types.OPEN_COURSE:
        return ;
    }
  });

export default studentCourseReducer;
