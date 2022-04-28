import { call, put, takeLatest, select } from "redux-saga/effects";
import Types from "./constants";
import { initDone, getResultSuccess, removeDataSuccess } from "./action";
import { makeSelectData } from "./selectors";
import servicesCourse from "../../../../services/web/course";
import servicesResult from "../../../../services/web/result";

export default function* watcherSaga() {
  yield takeLatest(Types.INIT, handleInit);
  yield takeLatest(Types.GET_RESULT_DASHBOARD, getResultDashboard);
  yield takeLatest(Types.REMOVEW_DATA, handleRemoveResult);
}

export function* handleInit() {
  try {
    const res = yield call(servicesCourse.courses.getCourseAndTest);
    if (res.data.code == 200) {
      yield put(initDone(res.data.data));
    }
  } catch (err) {
    console.log("err", err);
  }
}

export function* getResultDashboard() {
  // console.log("getResultDashboard");
  try {
    const data = yield select(makeSelectData());
    const res = yield call(servicesResult.result.getResultTest, {
      id: data.test,
      course: data.data[data.course - 1]._id,
      page: data.page,
      rowsPerPage: data.rowsPerPage,
    });
    if (res.data.code == 200) {
      res.data.data.data.map((item, index) => {
        console.log({ item, id_student: item.id_student });
        res.data.data.data[index].student_name =
          item.id_student !== null ? item.id_student.full_name : "---";
      });
      // console.log("res.data.data", res.data.data);
      yield put(getResultSuccess(res.data.data));
    }
  } catch (err) {
    console.log("err", err);
  }
}

export function* handleRemoveResult() {
  const data = yield select(makeSelectData());
  try {
    const res = yield call(servicesResult.result.removeResult, {
      selectRow: data.selectRow,
    });
    if (res.data.code == 200) {
      yield put(removeDataSuccess(res.data.data));
      yield call(getResultDashboard);
    }
  } catch (err) {
    console.log("err", err);
  }
}
