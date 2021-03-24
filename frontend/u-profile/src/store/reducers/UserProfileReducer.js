import React from 'react'

import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT,AUTH_LOGIN_FAIL, AUTH_REGISTRATION, AUTH_REGISTRATION_FAIL, CAHNGE_PASSWORD, RESET_PASSWORD, LOGGED_IN_USER_INFO, RECOMENDED_USER, MUTUAL_FRIEND, REMOVE_MUTUAL_FRIEND, NOTIFICATION_COUNT, NOTIFICATION_LIST, REMOVE_NOTIFICATION_LIST, USER_PFORILE, GET_FOLLWING_USER, GET_FOLLWER_USER} from '../actions/ActionTypes'
import { auth_fail, auth_start } from '../actions/Auth'

const initialState = ({
    loggedinUserInfo: null,
    recomendedUser: [],
    mutualFriend: [],
    notificationCount : null,
    notificationList : [],
    userProfile:null,
    followerUser:[],
    followingUser:[],

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

const NotificationCount = (state, action) =>({
    ...state,
    notificationCount:action.notificatonCount

})

const NotificationList = (state, action) =>(
    console.log(action, 'action'),
    {
    ...state,
    notificationList:action.notificatonList

})

const RemoveNotificationList = (state, action) =>({
    ...state,
    notificationList:[]
})

const  UserProfile = (state, action) =>({
    ...state,
    userProfile:action.userProfile
})

const FollowerUser = (state, action) =>({
    ...state,
    followerUser:action.followerUser
})

const FollowingUser = (state, action) =>({
    ...state,
    followingUser:action.followingUser
})

const UserInfo = (state = initialState, action) =>{
    switch(action.type){
        case LOGGED_IN_USER_INFO: return loggedinUserInfo(state, action)
        case RECOMENDED_USER: return RecomendedUser(state, action)
        case MUTUAL_FRIEND: return MutualFriend(state, action)
        case REMOVE_MUTUAL_FRIEND: return RemoveMutualFriend(state, action)
        case NOTIFICATION_COUNT: return NotificationCount(state, action)
        case NOTIFICATION_LIST: return NotificationList(state, action)
        case REMOVE_NOTIFICATION_LIST: return RemoveNotificationList(state, action)
        case USER_PFORILE: return UserProfile(state, action)
        case GET_FOLLWER_USER: return FollowerUser(state, action)
        case GET_FOLLWING_USER: return FollowingUser(state, action)
        default: return state

    }

}

export default UserInfo;