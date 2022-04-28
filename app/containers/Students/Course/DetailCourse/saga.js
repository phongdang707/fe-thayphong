import { call, put, takeLatest } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import history from 'utils/history'
import Types from "./constants";
import { initDone,initError } from "./action";
import services from "../../../../services/web/course";

export default function* watcherSaga() {
   yield takeLatest(Types.INIT, handleInit);
   yield takeLatest(Types.OPEN_TEST, handleOpenTest );
}

export function* handleInit() {
  try {
    const history = createBrowserHistory()
    let id = history.location.search;
    id = id.slice(1,id.length);
    const res = yield call(services.courses.getDetailStudentCourse, {id:id});
    if (res.data.code === 200) {
      yield put(initDone(res.data.data));
    }else{
      yield put(initError(res.data));
    }
  } catch (err) {
    yield put(initError(err));
  }
}

export function* handleOpenTest(action) {
  history.push({
    pathname: '/student/course/test',
    search: `?${action.payload}`
  })
}
