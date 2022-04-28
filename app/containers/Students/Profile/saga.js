import { call, put, select, takeLatest } from "redux-saga/effects";

import Types from "./constants";
import { makeSelectDataConfirmPass, makeSelectProfile } from "./selector";
// import { loginError, loginSuccess } from "./action";
import services from "../../../services/web/student";

// import { mapData } from "./utils.map";
// import { setLocalStorage } from "../../services/storage";
import { onError, onSucess } from "./action";

export default function* watcherSaga() {
  yield takeLatest(Types.UPDATE_PASSWORD, updatePassword);
}

export function* updatePassword(action) {
  try {
    const dataInput = yield select(makeSelectDataConfirmPass());
    const info = yield select(makeSelectProfile());

    const params = {
      password: dataInput.confirmPassword.value,
      id: info.profile._id,
    };
    const res = yield call(services.students.updatePasswordStudent, params);
    if (res.data.code === 200) {
      if (res.data.errors) {
        yield put(onError(res.data.errors));
      } else {
        yield put(onSucess());
        // history.push({ pathname: "/admin/student" });
      }
    }
    // const data = mapData(action.payload);
    // const res = yield call(callApi, "users/login", "POST", data);
    // if (res.status === 200) {
    //   setLocalStorage("Authorization", res.data.token);
    //   yield put(loginSuccess(res.data));
    // }
  } catch (err) {
    console.log("err", err);
    // yield put(loginError(err));
  }
}
