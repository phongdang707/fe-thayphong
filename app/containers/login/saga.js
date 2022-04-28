import {call, put, takeLatest} from 'redux-saga/effects';

import Types from './constants';
import {loginError, loginSuccess} from './action';
import {callApiLogin} from '../../services/request';
import {mapData} from './utils.map';
import {setLocalStorage} from '../../services/storage';

export default function* watcherSaga() {
    yield takeLatest(Types.LOGIN_REQUEST, loginRequest);
}

export function* loginRequest(action) {
    try {
        const data = mapData(action.payload);
        const res = yield call(callApiLogin, 'users/login', 'POST', data);
        if (res.status === 200) {
            setLocalStorage('Authorization', res.data.token);
            yield put(loginSuccess(res.data));
        } else {
            console.log("res", res)
            yield put(loginError(res));
        }
    } catch (err) {
        console.log('err', err);
        yield put(loginError(err));
    }
}
