import { call, put, takeLatest } from "redux-saga/effects";
import history from "utils/history";
import Types from "./constants";
import { initDone } from "./action";
import services from "../../../services/web/student";

export default function* watcherSaga() {
  yield takeLatest(Types.INIT, handleInit);
  yield takeLatest(Types.DETAIL_COURSE, getDetailCourse);
}

export function* handleInit() {
  try {
    const res = yield call(services.students.getStudentDashboard);
    yield put(initDone(res.data));
  } catch (err) {
    console.log("err", err);
  }
}

export function* getDetailCourse(action) {
  // console.log("action", action);
  history.push({
    pathname: "/student/course",
    search: `?${action.payload}`,
  });
}
