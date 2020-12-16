import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASABLE_BURGER_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.PURCHASABLE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,     
                orderId:action.orderId
            }
            return {
                orders: state.orders.concat(newOrder),
                loading:false
            }
        case actionTypes.PURCHASABLE_BURGER_FAIL:
            return {
                ...state,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.orders,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;