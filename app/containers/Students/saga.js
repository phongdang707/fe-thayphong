import { call, put, takeLatest } from "redux-saga/effects";

import Types from "./constants";
import services from "../../services/web/student";
import { initDone } from "./action";

export default function* watcherSaga() {
  yield takeLatest(Types.INIT, handleInit);
  // yield takeLatest(Types.GET_PROFILE, handleInit);
}

export function* handleInit(action) {
  try {
    const res = yield call(services.students.getStudentById);
    // console.log("res", res);
    if (res.data.code === 200) {
      yield put(initDone(res.data.data));
    }
  } catch (error) {
    console.log("err", error);
  }
  // try {
  //   const data = mapData(action.payload);
  //   const res = yield call(callApi, 'users/login', 'POST', data);
  //   if (res.status === 200) {
  //     setLocalStorage('Authorization', res.data.token);
  //     yield put(loginSuccess(res.data));
  //   }
  // } catch (err) {
  //   console.log('err', err);
  //   yield put(loginError(err));
  // }
}
