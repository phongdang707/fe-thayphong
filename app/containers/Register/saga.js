import { call, put, takeLatest, select } from "redux-saga/effects";

import Types from "./constants";
import history from "utils/history";
import { makeSelectFormAddStudent } from "./selectors";
import services from "../../services/web/student";
import { onSucess, onError, initDone } from "./action";

export default function* watcherSaga() {
  yield takeLatest(Types.INIT, handleInit);
  yield takeLatest(Types.SUBMIT_ADD_STUDENT, addStudent);
  yield takeLatest(Types.UPDATE_PASSWORD, updatePassword);
  yield takeLatest(Types.UPDATE_STUDENT, updateInfo);
}

export function* addStudent(action) {
  try {
    const data = yield select(makeSelectFormAddStudent());

    const {
      classRoom,
      fullName,
      grade,
      school,
      yearOfBirth,
      name,
      password,
      phoneNumberStudent,
      phoneNumberFamily,
      address,
    } = data;
    const params = {
      class_room: classRoom.value,
      full_name: fullName.value,
      grade: grade.value,
      school: school.value,
      year_of_birth: yearOfBirth.value,
      user_name: name.value,
      password: password.value,
      phong_number_student: phoneNumberStudent.value,
      phong_number_family: phoneNumberFamily.value,
      address: address.value,
      time: new Date().getTime(),
    };
    const res = yield call(services.students.register, params);
    console.log("res", res);
    if (res.data.code === 200) {
      yield put(onSucess());
      history.push({ pathname: "/" });
    } else {
      yield put(onError(res));
    }
  } catch (err) {
    console.log("err", err);
    // yield put(onError());
    // yield put(onError, err);
  }
}

export function* handleInit(action) {
  try {
    // const data = yield select(makeSelectFormAddStudent());
    // const { activeId } = data;
    // console.log("activeId", activeId);
    let res = {};
    if (action.payload.id) {
      res = yield call(services.students.getStudentByIdForAdmin, {
        id: action.payload.id,
      });
      res = res.data.data;
    }
    yield put(initDone(res));
  } catch (err) {
    console.log("err", err);
    // yield put(onError());
    // yield put(onError, err);
  }
}

export function* updatePassword(action) {
  try {
    const data = yield select(makeSelectFormAddStudent());
    // console.log("data", data);
    const { password, activeId } = data;
    const params = {
      password: password.value,
      id: activeId,
    };
    const res = yield call(services.students.updatePassword, params);
    if (res.data.code === 200) {
      if (res.data.errors) {
        yield put(onError(res.data.errors));
      } else {
        yield put(onSucess());
        history.push({ pathname: "/admin/student" });
      }
    }
  } catch (err) {
    console.log("err", err);
    // yield put(onError());
    // yield put(onError, err);
  }
}

export function* updateInfo(action) {
  try {
    const data = yield select(makeSelectFormAddStudent());

    const {
      classRoom,
      fullName,
      grade,
      school,
      yearOfBirth,
      name,
      phoneNumberStudent,
      phoneNumberFamily,
      address,
      activeId,
    } = data;
    const params = {
      class_room: classRoom.value,
      full_name: fullName.value,
      grade: grade.value,
      school: school.value,
      year_of_birth: yearOfBirth.value,
      user_name: name.value,
      phong_number_student: phoneNumberStudent.value,
      phong_number_family: phoneNumberFamily.value,
      address: address.value,
      activeId,
    };
    const res = yield call(services.students.update, params);
    console.log("res", res);
    if (res.data.code === 200) {
      yield put(onSucess());
      history.push({ pathname: "/admin/student" });
    } else {
      yield put(onError(res));
    }
  } catch (err) {
    console.log("err", err);
    // yield put(onError());
    // yield put(onError, err);
  }
}
