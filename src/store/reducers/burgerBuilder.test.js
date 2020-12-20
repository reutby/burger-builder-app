import reducer from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

describe('burgerBuilder reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            ingredients: null,
            totalPrice: 4,
            error: false,
            building:false
        });
    });

    it('should update specific amount of ingredient upon adding and set building to true', () => {
        expect(reducer({
            ingredients: {
                meat:0,
            },
            totalPrice: 4,
            error: false,
            building:false
        }, {
            type: actionTypes.ADD_INGREDIENT,
            ingType:'meat'
        })).toEqual({
            ingredients: {
                meat:1
            },
            totalPrice: 5.3,
            error: false,
            building:true
        });
    })

    it('should update specific amount of ingredient upon REMOVING and set building to true', () => {
        expect(reducer({
            ingredients: {
                meat:1,
            },
            totalPrice:5.3,
            error: false,
            building:false
        }, {
            type: actionTypes.REMOVE_INGREDIENT,
            ingType:'meat'
        })).toEqual({
            ingredients: {
                meat:0
            },
            totalPrice:4,
            error: false,
            building:true
        });
    })

    it('should update ingredients state upon set init ingredients', () => {
        expect(reducer({
            ingredients: null,
            totalPrice:4,
            error: false,
            building:false
        }, {
            type: actionTypes.SET_INIT_INGREDIENTS,
            ingredients:{
                meat:0,
                salad:0,
                bacon:0
            }
        })).toEqual({
            ingredients: {
                meat:0,
                salad:0,
                bacon:0
            },
            totalPrice:4,
            error: false,
            building:false
        });
    })

    it('should set error upon failed fetching ingredients', () => {
        expect(reducer({
            ingredients: null,
            totalPrice:4,
            error: false,
            building:false
        }, {
            type: actionTypes.FETCH_INGREDIENTS_FAILED,
           
        })).toEqual({
            ingredients: null,
            totalPrice:4,
            error: true,
            building:false
        });
    })
});
