import { call, put, takeLatest, select } from "redux-saga/effects";
import servicesCourse from "../../../../services/web/course.js";
import servicesExam from "../../../../services/web/exam.js";
import servicesTest from "../../../../services/web/test.js";
import Types from "./constants";
import {
  getDetailSuccess,
  getDetailError,
  getExamSuccess,
  getExamError,
  postExamSuccess,
  postExamError,
  postChangeStatusSuccess,
  postChangeStatusError,
  selectRowSuccess,
} from "./action";
import { callApi } from "services/request";
import { createBrowserHistory } from "history";
import { mapData, mapDataExam, mapDataStatus } from "./utils.map";
import { makeSelectData } from "./selectors";
export default function* watcherSaga() {
  yield takeLatest(Types.COURSE_GET_DETAIL, getDetailCourse);
  yield takeLatest(Types.VIEW_EXAM_REQUEST, viewExamRequest);
  yield takeLatest(Types.VIEW_DETAIL_SUBMIT, onPostNewTest);
  yield takeLatest(Types.CHANGE_STATUS_COURSE, changeStatusCourse);
  yield takeLatest(Types.SELECT_ROW_TEST, changeStatusTest);
}

export function* getDetailCourse(action) {
  try {
    const history = createBrowserHistory();
    let id = history.location.search;
    id = id.slice(1, id.length);
    const  data = yield select(makeSelectData());
    const res = yield call(servicesCourse.courses.getDetailCourseById, {
      id: id, pageTest:data.pageTest, rowsPerPageTest:data.rowsPerPageTest , pageStudent:data.pageStudent, rowsPerPageStudent:data.rowsPerPageStudent
    });
    if (res.data.code === 200) {
      yield put(getDetailSuccess(res.data.data));
    } else {
      yield put(getDetailError());
    }
  } catch (err) {
    yield put(getExamError(err));
  }
}

export function* viewExamRequest(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapData(data);
    const res = yield call(servicesExam.exam.getList, postData);
    if (res.data.code === 200) {
      yield put(getExamSuccess(res.data.data));
    }
  } catch (err) {
    yield put(getExamError(err));
  }
}

export function* onPostNewTest(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapDataExam(data);
    const res = yield call(servicesTest.test.create, postData);
    if (res.data.code === 200) {
      yield put(postExamSuccess());
    }
  } catch (err) {
    yield put(postExamError(err));
  }
}

export function* changeStatusCourse(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapDataStatus(data);
    const res = yield call(servicesCourse.courses.changeStatus, postData);
    if (res.data.code === 200) {
      yield put(postChangeStatusSuccess());
    }
  } catch (err) {}
}

export function* changeStatusTest(action) {
  try {
    const data = yield select(makeSelectData());
    const res = yield call(servicesTest.test.changeStatus, {
      id: data.idActive,
    });
    if (res.data.code === 200) {
      yield put(selectRowSuccess());
    }
  } catch (err) {}
}
