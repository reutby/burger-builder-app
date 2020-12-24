import {takeEvery} from "redux-saga/effects"
import * as actionTypes from "../actions/actionTypes";
import { logoutSaga,checkAuthTimeOutSaga,authUserSaga,authCheckStateSaga } from "./Auth";
import {setInitIngredientsSaga} from "./BurgerBuilder";
import {purchasableBurgerSaga,fetchOrderSaga} from "./order";

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga) 
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.SET_INIT_INGREDIENTS_START,setInitIngredientsSaga);
}

export function* watchOrder(){
    yield takeEvery(actionTypes.PURCHASABLE_BURGER,purchasableBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrderSaga);
}