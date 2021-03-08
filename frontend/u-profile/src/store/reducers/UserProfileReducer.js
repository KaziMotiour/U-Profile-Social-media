import React from 'react'

import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT,AUTH_LOGIN_FAIL, AUTH_REGISTRATION, AUTH_REGISTRATION_FAIL, CAHNGE_PASSWORD, RESET_PASSWORD, LOGGED_IN_USER_INFO} from '../actions/ActionTypes'
import { auth_fail, auth_start } from '../actions/Auth'

const initialState = ({
    loggedinUserInfo:null,

})

const loggedinUserInfo = (state, action) =>({
    ...state,
    loggedinUserInfo:action.loggedinUserInfo
})




const UserInfo = (state = initialState, action) =>{
    switch(action.type){
        case LOGGED_IN_USER_INFO: return loggedinUserInfo(state, action)
        default: return state

    }

}

export default UserInfo;