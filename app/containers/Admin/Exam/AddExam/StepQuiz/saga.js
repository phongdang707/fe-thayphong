import { call, put, takeLatest ,select} from 'redux-saga/effects';
import services from "../../../../../services/web/quiz.js";
import Types from './constants';
import {getQuizSuccess, getQuizError, addSuccess, addError, modalClose, deleteQuizSuccess, deleteQuizError} from './action';
import { callApi } from 'services/request';

import { mapData, mapDataDelete } from './utils.map';
import { makeSelectData } from "./selectors";

export default function* watcherSaga() {
  yield takeLatest(Types.EXAM_GET_QUIZ, getQuizExam);
  yield takeLatest(Types.QUIZ_ADD_REQUEST, addQuizRequest);
  yield takeLatest(Types.DELETE_QUIZ, onDeleteQuiz);
}

export function* getQuizExam(action) {
  try {
    const  data = yield select(makeSelectData());
    if(!data.id){
      return;
    }
    const res = yield call(services.quiz.getQuizById, {id: data.id, page:data.page, rowsPerPage:data.rowsPerPage });
    if (res.data.code === 200) {
      yield put(getQuizSuccess(res.data.data));
    }else{
      yield put(getQuizError());
    }
  } catch (err) {
    yield put(getQuizError(err));
  }
}

export function* addQuizRequest(action) {
  try {
    const  data = yield select(makeSelectData());
    const postData = mapData(data);
    let res = null;
    postData.id_question?
      res = yield call(services.quiz.edit, postData):
      res = yield call(services.quiz.create, postData);
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

export function* onDeleteQuiz(action) {
  try {
    const  data = yield select(makeSelectData());
    const postData = mapDataDelete(data);
     const res = yield call(services.quiz.delete, postData);
     if (res.data.code === 200) {
       yield put(deleteQuizSuccess());
     }
     else{
       yield put(deleteQuizError("Gửi dữ liệu thất bại!"));
     }
  } catch (err) {
    yield put(deleteQuizError(err));
  }
}
