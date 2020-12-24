import orderAxios from "../../axios-orders";
import * as actions from "../actions/index";
import { put } from "redux-saga/effects";


export function* setInitIngredientsSaga(action) {

    try{
        const res =yield orderAxios.get("/ingredient.json");
        yield put(actions.setIngredients(res.data));

    }catch(err){
        yield put(actions.fetchIngredientsFailed());

    }
}