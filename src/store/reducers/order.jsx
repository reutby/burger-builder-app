import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";
const initialState = {
    orders: [],
    loading: false
}

const purchasableBurgerStart =(state)=>{
    return updateObject(state, { loading: true });
}

const purchasableBurgerSuccess =(state,action)=>{
    const newOrder = {
        ...action.orderData,
        orderId: action.orderId
    };
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false
    });
}

const purchasableBurgerFail =(state)=>{
    return updateObject(state, { loading: false });
}

const fetchOrdersStart =(state)=>{
    return updateObject(state, { loading: true });
}

const fetchOrdersSuccess =(state,action)=>{
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

const fetchOrdersFail =(state)=>{
    return updateObject(state,{
        loading: false
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASABLE_BURGER_START: return purchasableBurgerStart(state);
        case actionTypes.PURCHASABLE_BURGER_SUCCESS: return purchasableBurgerSuccess(state,action);            
        case actionTypes.PURCHASABLE_BURGER_FAIL: return purchasableBurgerFail(state);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
        default:
            return state;
    }
}

export default reducer;