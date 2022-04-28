import { call, put, takeLatest,select } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import history from 'utils/history'
import Types from "./constants";
import { initDone,initError } from "./action";
import { mapData } from './utils.map';
import { makeSelectData } from "./selectors";
import services from "../../../../../services/web/result";

export default function* watcherSaga() {
   yield takeLatest(Types.INIT, handleInit);
   yield takeLatest(Types.DO_TEST_DONE, onSubmit);
}

export function* handleInit() {
  try {
    const history = createBrowserHistory()
    let id = history.location.search;
    id = id.slice(1,id.length);
    const res = yield call(services.result.getQuizTest, {id:id});
    if (res.data.code === 200) {
      yield put(initDone(res.data.data));
    }else{
      yield put(initError(res.data));
    }
  } catch (err) {
    yield put(initError(err));
  }
}

export function* onSubmit() {
  const  data = yield select(makeSelectData());
  if(data.firstClick != 1) return;
  const postData = mapData(data);
  const res = yield call(services.result.submit, postData);
  if (res.data.code === 200) {
    history.push({
      pathname: '/student/course/test',
      search: `?${res.data.data}`
    })
  }
}
