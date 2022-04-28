import { call, put, takeLatest ,select} from 'redux-saga/effects';
import services from "../../../../../services/web/student.js";
import Types from './constants';
import { viewSuccess, viewError,viewDeleteSuccess,viewDeleteError } from './action';
import { callApi } from 'services/request';
import { mapData } from './utils.map';
import { makeSelectData } from "./selectors";

export default function* watcherSaga() {
  yield takeLatest(Types.VIEW_STUDENT_REQUEST, viewCourseRequest);

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
    console.log('err', err);
    yield put(viewError(err));
  }
}
