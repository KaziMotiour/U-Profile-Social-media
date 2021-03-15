import React from 'react'

import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT,AUTH_LOGIN_FAIL, AUTH_REGISTRATION, AUTH_REGISTRATION_FAIL, CAHNGE_PASSWORD, RESET_PASSWORD, LOGGED_IN_USER_INFO, RECOMENDED_USER, MUTUAL_FRIEND, REMOVE_MUTUAL_FRIEND} from '../actions/ActionTypes'
import { auth_fail, auth_start } from '../actions/Auth'

const initialState = ({
    loggedinUserInfo:null,
    recomendedUser:[],
    mutualFriend:[]

})

const loggedinUserInfo = (state, action) =>({
    ...state,
    loggedinUserInfo:action.loggedinUserInfo
})
const RecomendedUser = (state, action) =>({
    ...state,
    recomendedUser:action.recomended_user
})
const MutualFriend = (state, action) =>(
    console.log(action.mutual_friend,'reducer'),
    {
    ...state,
    mutualFriend:action.mutual_friend
})

const RemoveMutualFriend = (state, action) =>(
    {
    ...state,
    mutualFriend:[]
})


const UserInfo = (state = initialState, action) =>{
    switch(action.type){
        case LOGGED_IN_USER_INFO: return loggedinUserInfo(state, action)
        case RECOMENDED_USER: return RecomendedUser(state, action)
        case MUTUAL_FRIEND: return MutualFriend(state, action)
        case REMOVE_MUTUAL_FRIEND: return RemoveMutualFriend(state, action)
        default: return state

    }

}

export default UserInfo;