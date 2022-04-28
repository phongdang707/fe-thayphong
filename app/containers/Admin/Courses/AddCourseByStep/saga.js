import { call, put, takeLatest ,select} from 'redux-saga/effects';
import history from 'utils/history'
import services from "../../../../services/web/course.js";
import Types from './constants';
import { addSuccess, addError ,getCurrentActionSuccess , checkDataSuccess , checkDataError} from './action';
import { callApi } from 'services/request';

import { mapData ,mapCheckData} from './utils.map';
import { makeSelectData } from "./selectors";
import { createBrowserHistory } from "history";
export default function* watcherSaga() {
  yield takeLatest(Types.ADD_COURSE_REQUEST, addCourseRequest);
  yield takeLatest(Types.INIT, getCurrentAction);
  yield takeLatest(Types.ADD_CHECK_INFO, checkDataBeforeNextStep);
}

export function* getCurrentAction(action) {
  try {
    const history = createBrowserHistory()
    if(history.location.pathname == "/admin/courses/addCourse"){
      yield put(getCurrentActionSuccess({addCourse:true}));
    }
    else{
      let id = history.location.search;
      id = id.slice(1,id.length);
      const res = yield call(services.courses.getCourseById, {id:id});
      if (res.data.code === 200) {
        yield put(getCurrentActionSuccess({addCourse:false , data:res.data.data}));
      }
      else{
        yield put(addError("Không tìm thấy khóa học!"));
      }
    }
  } catch (err) {
    yield put(addError(err));
  }
}

export function* addCourseRequest(action) {
  try {
    const  data = yield select(makeSelectData());
    const postData = mapData(data);
    let res = null;
    postData.get('id')?
      res = yield call(services.courses.edit, postData):
      res = yield call(services.courses.create, postData);
     if (res.data.code === 200) {
       yield put(addSuccess());
       history.push('/admin/courses')
     }
     else{
       yield put(addError("Gửi dữ liệu thất bại!"));
     }
  } catch (err) {
    yield put(addError(err));
  }
}

export function* checkDataBeforeNextStep(action) {
  try {
    const  data = yield select(makeSelectData());
    const postData = mapCheckData(data);
     const res = yield call(services.courses.checkInfoToCreate, postData);
     if (res.data.code === 500) {
       yield put(checkDataError(res.data.errors));
    }  else {
       yield put(checkDataSuccess());
     }
  } catch (err) {
    yield put(addError(err));
  }
}
