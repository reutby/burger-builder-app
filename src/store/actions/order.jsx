import * as actionTypes from "./actionTypes";
import orderAxios from "../../axios-orders";


export const purchasableBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASABLE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData

    }
}


export const purchasableBurgerFail = (err) => {
    return {
        type: actionTypes.PURCHASABLE_BURGER_FAIL,
        error: err
    }
}

export const purchasableBurgerStart = () => {
    return {
        type: actionTypes.PURCHASABLE_BURGER_START
    }
}

export const purchasableBurger = (order, history) => {
    return dispatch => {
        dispatch(purchasableBurgerStart());
        orderAxios.post("/orders.json", order)
            .then(response => {
                dispatch(purchasableBurgerSuccess(response.data.name, order));
                history.push("/orders");
            })
            .catch(err => {

                dispatch(purchasableBurgerFail(err));
                history.history("/orders");
            });
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    }
}


export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        orderAxios.get("/orders.json")
            .then(res => {
                const resdata = res.data;
                const updateOrders = [];
                console.log(resdata);
                for (let key in resdata) {
                    updateOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(updateOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
} 