import { call, put, takeLatest ,select} from 'redux-saga/effects';
import services from "../../../../services/web/exam.js";
import Types from './constants';
import { viewSuccess, viewError,viewDeleteSuccess,viewDeleteError } from './action';
import { callApi } from 'services/request';
import { mapData,mapDataDelete } from './utils.map';
import { makeSelectData } from "./selectors";
import history from 'utils/history'

export default function* watcherSaga() {
  yield takeLatest(Types.VIEW_EXAM_REQUEST, viewExamRequest);
  yield takeLatest(Types.VIEW_DELETE_ITEMS, viewExamDeleteItem);
  yield takeLatest(Types.VIEW_SELECT_EDIT, viewExamSelectEdit);
  // yield takeLatest(Types.VIEW_SELECT_ROW, viewCourseSelectRow);
}

export function* viewExamSelectEdit(action) {
  history.push({
    pathname: '/admin/exam/viewExam',
    search: `?${action.payload}`
  })
}

// export function* viewCourseSelectRow(action) {
//   history.push({
//     pathname: '/admin/courses/addContent',
//     search: `?${action.payload}`
//   })
// }

export function* viewExamRequest(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapData(data);
    const res = yield call(services.exam.getList, postData);
    if (res.data.code === 200) {
      yield put(viewSuccess(res.data.data));
    }
  } catch (err) {
    yield put(viewError(err));
  }
}

export function* viewExamDeleteItem(action) {
  try {
    const data = yield select(makeSelectData());
    const postData = mapDataDelete(data);
    const res = yield call(services.exam.delete, postData);
    if (res.data.code === 200) {
     yield put(viewDeleteSuccess());
    }
  } catch (err) {
    yield put(viewDeleteError(err));
  }
}
