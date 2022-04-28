import { call, put, takeLatest ,select} from "redux-saga/effects";
import Types from "./constants";
import {initDone, restoreDataSuccess } from "./action";
import services from "../../../../services/web/data.js";
import { makeSelectData } from "./selectors";
import { mapData, mapRestoreData } from './utils.map';

export default function* watcherSaga() {
  yield takeLatest(Types.INIT, handleGetData);
  yield takeLatest(Types.DATA_ACTION, handleDataAction);
}

export function* handleGetData() {
  const  data = yield select(makeSelectData());
  const postData = mapData(data);
  try {
    const res = yield call(services.data.getData,postData);
    if(res.data.code== 200){
      yield put(initDone(res.data.data));
    }
  } catch (err) {
    console.log("err", err);
  }
}

export function* handleDataAction() {
  const  data = yield select(makeSelectData());
  const postData = mapRestoreData(data);
  switch (data.action) {
    case "restore":
      try {
        const res = yield call(services.data.getRestoreData,postData);
        if(res.data.code== 200){
          yield put(restoreDataSuccess(res.data.data));
        }
      } catch (err) {
        console.log("err", err);
      }
      break;
    case "remove":
      try {
        const res = yield call(services.data.getRemoveData,postData);
        if(res.data.code== 200){
          yield put(restoreDataSuccess(res.data.data));
        }
      } catch (err) {
        console.log("err", err);
      }
      break;
    default:
      break;
  }

}
