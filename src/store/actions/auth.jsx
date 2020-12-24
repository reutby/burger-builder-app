import * as actionsTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    }
}

export const authSuccess = (tokenId, localId) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: localId
    }
}

export const authFail = (error) => {
   
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    
    return {
        type: actionsTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSuccess =()=>{
    return{
        type: actionsTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut = (expiredTime) => {
    return {
        type:actionsTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expiredTime
    }

}

export const authCheckState = () => {
   return{
       type:actionsTypes.AUTH_CHECK_STATE
   }
}
export const auth = (email, password, isSignUp) => {
    return{
        type:actionsTypes.AUTH_USER,
        email:email,
        password:password,
        isSignUp:isSignUp
    }
}
