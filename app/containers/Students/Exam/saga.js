import { call, put, takeLatest, select } from "redux-saga/effects";
import Types from "./constants";
import { initDone } from "./action";
import services from "../../../services/web/result";
import { makeSelectData } from "./selectors";

export default function* watcherSaga() {
  yield takeLatest(Types.INIT, handleInit);
}

export function* handleInit() {
  try {
    const data = yield select(makeSelectData());
    const res = yield call(services.result.getResult, {
      page: data.page,
      rowsPerPage: data.rowsPerPage,
    });
    if (res.data.code == 200) {
      res.data.data.data.map((item, index) => {
        if (item.id_test) {
          res.data.data.data[index].course_name =
            item.id_test.id_course.name_course;
          res.data.data.data[index].exam_name = item.id_test.name_exam;
        } else {
          res.data.data.data[index].course_name = "Bài thi đã xóa";
          res.data.data.data[index].exam_name = "";
        }
      });
      yield put(initDone(res.data.data));
    }
  } catch (err) {
    console.log("err", err);
  }
}
