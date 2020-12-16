import * as actionsTypes from "../actions/actionTypes"

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    onion: 0.3
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionsTypes.SET_INIT_INGREDIENTS:
        //     return {
        //         ingredients: action.value
        //     }
        case actionsTypes.ADD_INGREDIENT:
            const updateAddIng = { ...state.ingredients };
            updateAddIng[action.ingType]++;
            let addTotalPrice = state.totalPrice;
            addTotalPrice += INGREDIENT_PRICES[action.ingType];
            return {
                ...state,
                ingredients: updateAddIng,
                totalPrice: Math.round(addTotalPrice * 100)/100
            }
        case actionsTypes.REMOVE_INGREDIENT:
            const updateRemoveIng = { ...state.ingredients };
            updateRemoveIng[action.ingType]--;
            let removeTotalPrice = state;
            removeTotalPrice -= INGREDIENT_PRICES[action.ingType];
            return {
                ...state,
                ingredients: updateRemoveIng,
                totalPrice: Math.round(removeTotalPrice * 100)/100
            }
        case actionsTypes.SET_INIT_INGREDIENTS:
            return{
                ...state,
                error:false,
                totalPrice:4,
                ingredients:{
                    salad:action.ingredients.salad,
                    onion:action.ingredients.onion,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                }
            }
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        default :
            return state;
        

    }
}

export default reducer;