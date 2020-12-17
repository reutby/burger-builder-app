import * as actionsTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    }
}

export const authSuccess = (tokenId, localId) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: localId
    }
}

export const authFail = (error) => {
    console.log(actionsTypes.AUTH_FAIL);
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut = (expiredTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiredTime * 1000);
    }

}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    }
}
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAs8r2hvENSeEQ6Daiyim9nIeXT0kZKUBw";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAs8r2hvENSeEQ6Daiyim9nIeXT0kZKUBw";
        }

        axios.post(url, payload)
            .then(res => {
                console.log(res.data)
                const expirationDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId',res.data.localId);

                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeOut(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));
            });

    }
}
