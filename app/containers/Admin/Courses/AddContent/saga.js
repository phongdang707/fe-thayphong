import { call, put, takeLatest ,select} from 'redux-saga/effects';
import services from "../../../../services/web/content.js";
import Types from './constants';
import { getContentSuccess, getContentError, addSuccess, addError, modalClose, deleteContentSuccess, deleteContentError} from './action';
import { callApi } from 'services/request';
import { createBrowserHistory } from "history";
import { mapData,mapDataDelete } from './utils.map';
import { makeSelectData } from "./selectors";
export default function* watcherSaga() {
  yield takeLatest(Types.CONTENT_GET_CONTENT, getContentCourse);
  yield takeLatest(Types.CONTENT_ADD_REQUEST, addContentRequest);
  yield takeLatest(Types.DELETE_CONTENT, onDeleteContent);
}

export function* getContentCourse(action) {
  try {
    const history = createBrowserHistory()
    let id = history.location.search;
    id = id.slice(1,id.length);
    const  data = yield select(makeSelectData());
    const res = yield call(services.contents.getContentById, {id:id, page:data.page, rowsPerPage:data.rowsPerPage});
    if (res.data.code === 200) {
      yield put(getContentSuccess(res.data.data));
    }else{
      yield put(getContentError());
    }
  } catch (err) {
    yield put(getContentError(err));
  }
}

export function* addContentRequest(action) {
  try {
    const  data = yield select(makeSelectData());
    const postData = mapData(data);
    let res = null;
    postData.id_content?
      res = yield call(services.contents.edit, postData):
      res = yield call(services.contents.create, postData);
     if (res.data.code === 200) {
       yield put(addSuccess());
       yield put(modalClose());
     }
     else{
       yield put(addError("Gửi dữ liệu thất bại!"));
     }
  } catch (err) {
    yield put(addError(err));
  }
}

export function* onDeleteContent(action) {
  try {
    const  data = yield select(makeSelectData());
    const postData = mapDataDelete(data);
    const res = yield call(services.contents.delete, postData);
    if (res.data.code === 200) {
      yield put(deleteContentSuccess());
    }
    else{
      yield put(deleteContentError("Gửi dữ liệu thất bại!"));
    }
  } catch (err) {
    yield put(deleteContentError(err));
  }
}
