import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            tokenId: null,
            userId: null,
            loading: false,
            error: null
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            tokenId: null,
            userId: null,
            loading: false,
            error: null
        }, {
            type: actionTypes.AUTH_SUCCESS,
            tokenId: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            tokenId:'some-token',
            userId:'some-user-id',
            loading:false,
            error:null
        });
    })

    it('should store the error upon failed', () => {
        expect(reducer({
            tokenId: null,
            userId: null,
            loading: false,
            error: null
        }, {
            type: actionTypes.AUTH_FAIL,
            error: 'some-error'
        })).toEqual({
            tokenId: null,
            userId: null,
            loading: false,
            error: 'some-error'
        });
    })

    it('should clear the tokenId and userId upon logout', () => {
        expect(reducer({
            tokenId: 'sum-token',
            userId: 'sum userId',
            loading: false,
            error: null
        }, {
            type: actionTypes.AUTH_LOGOUT
        })).toEqual({
            tokenId: null,
            userId: null,
            loading: false,
            error: null
        });
    })

    it('should change the loading state to true upon start ', () => {
        expect(reducer({
            tokenId: null,
            userId: null,
            loading: false,
            error: null
        }, {
            type: actionTypes.AUTH_START
        })).toEqual({
            tokenId: null,
            userId: null,
            loading: true,
            error: null
        });
    })
});
