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

export const purchasableBurger = (order, history,token) => {
    return dispatch => {
        dispatch(purchasableBurgerStart());
        orderAxios.post("/orders.json?auth="+token, order)
            .then(response => {
                dispatch(purchasableBurgerSuccess(response.data.name, order));
                history.push("/");
            })
            .catch(err => {
               
                dispatch(purchasableBurgerFail(err));
                history.push("/");
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


export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        
        orderAxios.get("/orders.json"+queryParams)
            .then(res => {
                const resdata = res.data;
                const updateOrders = [];
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