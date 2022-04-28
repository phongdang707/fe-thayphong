
import produce from 'immer';
import Types from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  id: '',
  course:[]
};

/* eslint-disable default-case, no-param-reassign */
const studentDashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Types.INIT:
        draft.loading = true;
        return;
      case Types.INIT_DONE:
        draft.loading = false;
        draft.id = action.payload._id;
        draft.course = action.payload.course;
        return;
      case Types.RESET:
        return initialState;
      case Types.OPEN_COURSE:
        return ;
    }
  });

export default studentDashboardReducer;
