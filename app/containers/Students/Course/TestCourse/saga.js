import { call, put, takeLatest,select } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import history from 'utils/history'
import Types from "./constants";
import { initDone,initError , onResumeDoTest, initDoneResult} from "./action";
import { mapData } from './utils.map';
import { makeSelectData } from "./selectors";
import servicesTest from "../../../../services/web/test";
import servicesResult from "../../../../services/web/result";

export default function* watcherSaga() {
   yield takeLatest(Types.INIT, handleInit);
   yield takeLatest(Types.OPEN_TEST, handleOpenTest );
   yield takeLatest(Types.OPEN_TEST_RESUME, handleResumeTest );
}

export function* handleInit() {
  try {
    const history = createBrowserHistory()
    let id = history.location.search;
    id = id.slice(1,id.length);
    const res = yield call(servicesTest.test.getDetailTest, {id:id});
    if (res.data.code === 200) {
      if(res.data.studentData){
        if(res.data.studentData.isDoing){
          yield put(onResumeDoTest(res.data.studentData._id));
        }else yield put(initDoneResult(res.data));
      }else yield put(initDone(res.data.data));
    }else{
      yield put(initError(res.data));
    }
  } catch (err) {
    yield put(initError(err));
  }
}

export function* handleResumeTest(action) {
  history.push({
    pathname: '/student/course/test/do-exam',
    search: `?${action.payload}`
  })

}

export function* handleOpenTest() {
  const  data = yield select(makeSelectData());
  if(data.firstClick != 1) return;
  const postData = mapData(data);
  const res = yield call(servicesResult.result.create, postData);
  if (res.data.code === 200) {
    history.push({
      pathname: '/student/course/test/do-exam',
      search: `?${res.data.data._id}`
    })
  }
}
