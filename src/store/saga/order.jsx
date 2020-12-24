import { put } from "redux-saga/effects";

import * as actions from "../actions/index";
import orderAxios from "../../axios-orders";

export function* purchasableBurgerSaga(action) {

    yield put(actions.purchasableBurgerStart());

    try {
        const response = yield orderAxios.post("/orders.json?auth=" + action.token, action.order);
        yield put(actions.purchasableBurgerSuccess(response.data.name, action.order));
        yield action.history.push("/");
    } catch (err) {
        yield put(actions.purchasableBurgerFail(err));
        yield action.history.push("/");
    }
}

export function* fetchOrderSaga(action) {

    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try{
        const res = yield orderAxios.get("/orders.json" + queryParams);
        const resData = res.data;
            const updateOrders = [];
            for (let key in resData) {
                updateOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            yield put(actions.fetchOrdersSuccess(updateOrders));

    }catch(err){
        yield put(actions.fetchOrdersFail(err));
    }
}