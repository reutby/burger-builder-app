import { delay, put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";


export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSuccess());
}

export function* checkAuthTimeOutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {

    yield put(actions.authStart());
    const payload = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAs8r2hvENSeEQ6Daiyim9nIeXT0kZKUBw";
    if (!action.isSignUp) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAs8r2hvENSeEQ6Daiyim9nIeXT0kZKUBw";
    }

    try {
        const res = yield axios.post(url, payload);

        const expirationDate = yield new Date(new Date().getTime() + (res.data.expiresIn * 1000));
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);

        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeOut(res.data.expiresIn));
    } catch (err) {
        yield put(actions.authFail(err.response.data.error));
    }
};

export function* authCheckStateSaga(action) {

    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }

}