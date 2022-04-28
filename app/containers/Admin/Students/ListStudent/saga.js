import { call, put, select, takeLatest } from "redux-saga/effects";
import services from "../../../../services/web/student";
import Types from "./constants";
import {
  downloadFileDone,
  viewDeleteError,
  viewDeleteSuccess,
  viewError,
  viewSuccess,
} from "./action";
import { mapData, mapDataDelete } from "./utils.map";
import { makeSelectData } from "./selectors";
import history from "utils/history";
import fileDownload from "js-file-download";

export default function* watcherSaga() {
  yield takeLatest(Types.VIEW_COURSE_REQUEST, viewCourseRequest);
  yield takeLatest(Types.VIEW_DELETE_ITEMS, viewCourseDeleteItem);
  yield takeLatest(Types.VIEW_SELECT_ROW, viewCourseSelectRow);
  yield takeLatest(Types.DOWNLOAD_FILE, downloadFile);
}

export function* viewCourseSelectRow(action) {
  history.push({
    pathname: `/admin/student/detail-student`,
    search: `?id=${action.payload}`,
  });
}

export function* downloadFile(action) {
  try {
    // const data = yield select(makeSelectData());
    // const postData = mapData(data);
    const res = yield call(services.students.downloadForStudent);
    if (res.status === 200) {
      yield put(downloadFileDone());
      const blob = new Blob([res.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      yield call(fileDownload(blob, `file.xlsx`));
    } else {
      yield put(downloadFileDone());
    }
  } catch (err) {
    console.log("err", err);
    yield put(viewError(err));
  }
}

export function* viewCourseRequest(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapData(data);
    const res = yield call(services.students.getList, postData);
    if (res.status === 200) {
      yield put(viewSuccess(res.data));
    }
  } catch (err) {
    console.log("err", err);
    yield put(viewError(err));
  }
}

export function* viewCourseDeleteItem(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapDataDelete(data);
    const res = yield call(services.students.delete, postData);
    if (res.status === 200) {
      yield put(viewDeleteSuccess());
    }
  } catch (err) {
    console.log("err", err);
    yield put(viewDeleteError(err));
  }
}
