import * as actionsTypes from "../actions"

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    onion: 0.3
};

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0,
        onion: 0
    },
    totalPrice: 4
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
                ingredients: updateAddIng,
                totalPrice: Math.round(addTotalPrice * 100)/100
            }
        case actionsTypes.REMOVE_INGREDIENT:
            const updateRemoveIng = { ...state.ingredients };
            updateRemoveIng[action.ingType]--;
            let removeTotalPrice = state;
            removeTotalPrice -= INGREDIENT_PRICES[action.ingType];
            return {
                ingredients: updateRemoveIng,
                totalPrice: Math.round(removeTotalPrice * 100)/100
            }
        default :
            return state;
        

    }
}

export default reducer;