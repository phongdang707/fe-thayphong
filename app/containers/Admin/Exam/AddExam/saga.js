import { call, put, takeLatest ,select} from 'redux-saga/effects';
import history from 'utils/history'
import services from "../../../../services/web/exam.js";
import Types from './constants';
import {addExamError, addExamSuccess, getCurrentActionSuccess, reset } from './action';
import { callApi } from 'services/request';

import { mapData } from './utils.map';
import { makeSelectData } from "./selectors";
import { createBrowserHistory } from "history";

export default function* watcherSaga() {
  yield takeLatest(Types.ADD_EXAM_REQUEST, addExamRequest);
  yield takeLatest(Types.INIT, getCurrentAction);
  yield takeLatest(Types.ADD_EXAM, checkDataBeforeNextStep);
}

export function* getCurrentAction(action) {
  try {
    const history = createBrowserHistory()
    if(history.location.pathname == "/admin/exam/addExam"){
      yield put(reset());
      yield put(getCurrentActionSuccess({addExam:true}));
    }
    else{
      let id = history.location.search;
      id = id.slice(1,id.length);
      const res = yield call(services.exam.getExamById, {id:id});
      if (res.data.code === 200) {
        yield put(reset());
        yield put(getCurrentActionSuccess({addExam:false , data:res.data.data}));
      }
      else{
        yield put(reset());
        //yield put(addError("Không tìm thấy khóa học!"));
      }
    }
  } catch (err) {
    //yield put(addError(err));
  }
}

export function* checkDataBeforeNextStep(action) {
  try {
    const  data = yield select(makeSelectData());
    const postData = mapData(data);
    let res = null;
    postData.id?
      res = yield call(services.exam.edit, postData):
      res = yield call(services.exam.create, postData);
     if (res.data.code === 500) {
         yield put(addExamError(res.data.errors));
    } else {
      yield put(addExamSuccess(res.data.data));
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* addExamRequest(action) {
  history.push('/admin/exam');
}
