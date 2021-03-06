import * as actionTypes from "./actionTypes";

export const addIngredient = (ing)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingType:ing
    };
}

export const removeIngredient = (ing)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingType:ing
    };
}

export const updateIngredients =(ingredients)=>{
    return {
        type:actionTypes.SET_INIT_INGREDIENTS,
        ingredients:ingredients
    }
}

export const setIngredients =(ingredients)=>{
    return {
        type:actionTypes.SET_INIT_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed =()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}
export const setInitIngredients =()=>{
    return {
        type:actionTypes.SET_INIT_INGREDIENTS_START
    }
}