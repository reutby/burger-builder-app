import * as actionTypes from "./actionTypes";

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
    return{
        type: actionTypes.PURCHASABLE_BURGER,
        order:order,
        history:history,
        token:token
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
   return{
       type:actionTypes.FETCH_ORDERS,
       token:token,
       userId:userId
   }
} 