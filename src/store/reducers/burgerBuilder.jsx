import * as actionsTypes from "../actions/actionTypes"
import { updateObject } from "../utility";
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
    error: false,
    building:false
}

const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingType]: state.ingredients[action.ingType] + 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updateState = {
        ingredients: updateIngredients,
        totalPrice: Math.round((state.totalPrice + INGREDIENT_PRICES[action.ingType]) * 100) / 100,
        building:true
    }
    return updateObject(state, updateState);

}

const removeIngredient = (state, action) => {
    const updateIngredient = { [action.ingType]: state.ingredients[action.ingType] - 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updateState = {
        ingredients: updateIngredients,
        totalPrice: Math.round((state.totalPrice - INGREDIENT_PRICES[action.ingType]) * 100) / 100,
        building:true
    }
    return updateObject(state, updateState);

}

const setInitIngredients = (state, action) => {
    const updateState = {
        error: false,
        totalPrice: 4,
        ingredients: {
            salad: action.ingredients.salad,
            onion: action.ingredients.onion,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        building:false

    }
    console.log(updateState);
    return updateObject(state, updateState);

}
const fetchIngredientsFailed = (state) => {
    return updateObject(state, { error: true });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionsTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionsTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionsTypes.SET_INIT_INGREDIENTS: return setInitIngredients(state, action);
        case actionsTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
        default:return state;

    }
}

export default reducer;