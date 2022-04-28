import { call, put, takeLatest ,select} from 'redux-saga/effects';
import services from "../../../../services/web/course.js";
import Types from './constants';
import { viewSuccess, viewError,viewDeleteSuccess,viewDeleteError } from './action';
import { callApi } from 'services/request';
import { mapData,mapDataDelete } from './utils.map';
import { makeSelectData } from "./selectors";
import history from 'utils/history'

export default function* watcherSaga() {
  yield takeLatest(Types.VIEW_COURSE_REQUEST, viewCourseRequest);
  yield takeLatest(Types.VIEW_DELETE_ITEMS, viewCourseDeleteItem);
  yield takeLatest(Types.VIEW_SELECT_EDIT, viewCourseSelectEdit);
  yield takeLatest(Types.VIEW_SELECT_DETAIL, viewCourseSelectDetail);
  yield takeLatest(Types.VIEW_SELECT_ROW, viewCourseSelectRow);
}

export function* viewCourseSelectEdit(action) {
  history.push({
    pathname: '/admin/courses/viewCourse',
    search: `?${action.payload}`
  })
}

export function* viewCourseSelectDetail(action) {
  history.push({
    pathname: '/admin/courses/detailCourse',
    search: `?${action.payload}`
  })
}

export function* viewCourseSelectRow(action) {
  history.push({
    pathname: '/admin/courses/addContent',
    search: `?${action.payload}`
  })
}

export function* viewCourseRequest(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapData(data);
    const res = yield call(services.courses.getList, postData);
    if (res.data.code === 200) {
      yield put(viewSuccess(res.data.data));
    }
  } catch (err) {
    yield put(viewError(err));
  }
}

export function* viewCourseDeleteItem(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapDataDelete(data);
    const res = yield call(services.courses.delete, postData);
    if (res.data.code === 200) {
     yield put(viewDeleteSuccess());
    }
  } catch (err) {
    yield put(viewDeleteError(err));
  }
}
