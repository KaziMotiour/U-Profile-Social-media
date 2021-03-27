import React from 'react'

import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT,AUTH_LOGIN_FAIL, AUTH_REGISTRATION, AUTH_REGISTRATION_FAIL, CAHNGE_PASSWORD, RESET_PASSWORD} from '../actions/ActionTypes'
import { auth_fail, auth_start } from '../actions/Auth'

const initialState = ({
    access_token : localStorage.getItem('access_token'),
    loading:false,
    login_error:null,
    registration_confirmation:null,
    registration_error:null

})

const authStart = (state, action) =>({
    ...state,
    loading:true
})
const authSuccess = (state, action) =>({
    ...state,
    access_token:action.access,
    loading:false,
   
})
const authFail = (state, action) =>({
    ...state,
    login_error:action.error,
    loading:false

})
const authLogout = (state, action) =>({
    ...state,
    access_token:null
})

const authRegistration = (state, action) =>({
    ...state,
    registration_confirmation:action.confirmation
})

const authRegistrationFail = (state, action) =>({
    ...state,
    registration_error:action.registration_error
    
})




const AuthReducer = (state = initialState, action) =>{
    switch(action.type){
        case AUTH_START: return authStart(state, action)
        case AUTH_SUCCESS: return authSuccess(state, action)
        case AUTH_LOGIN_FAIL: return authFail(state, action)
        case AUTH_REGISTRATION: return authRegistration(state, action)
        case AUTH_REGISTRATION_FAIL: return authRegistrationFail(state, action)
        default: return state

    }

}

export default AuthReducer;