import reducer from './order';
import * as actionTypes from '../actions/actionTypes';

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            orders: [],
            loading: false
        });
    });

    it('should set loading state to true', () => {
        expect(reducer({
            orders: [],
            loading: false
        }, {
            type: actionTypes.PURCHASABLE_BURGER_START,
        })).toEqual({
            orders: [],
            loading: true
        });
    });

    it('should concatenate the order data to the orders array ', () => {
        expect(reducer({
            orders: [],
            loading: false
        }, {
            type: actionTypes.PURCHASABLE_BURGER_SUCCESS,
            orderData: {
                some: 'a',
                order: 'b'
            },
            orderId: 'some-order-id'
        })).toEqual({
            orders: [{
                some: 'a',
                order: 'b',
                orderId: 'some-order-id'
            }],
            loading: false
        });
    });

    it('should set loading state to false', () => {
        expect(reducer({
            orders: [],
            loading: true
        }, {
            type: actionTypes.PURCHASABLE_BURGER_FAIL,
        })).toEqual({
            orders: [],
            loading: false
        });
    });

    it('should set loading state to true', () => {
        expect(reducer({
            orders: [],
            loading: false
        }, {
            type: actionTypes.FETCH_ORDERS_START,
        })).toEqual({
            orders: [],
            loading: true
        });
    });

    it('should set orders array to that array fetch from the server', () => {
        expect(reducer({
            orders: [],
            loading: false
        }, {
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            orders:['one','two','tree']
        })).toEqual({
            orders:['one','two','tree'],
            loading: false
        });
    });

    it('should set loading state to false', () => {
        expect(reducer({
            orders: [],
            loading: true
        }, {
            type: actionTypes.FETCH_ORDERS_FAIL,
        })).toEqual({
            orders: [],
            loading: false
        });
    });
});
