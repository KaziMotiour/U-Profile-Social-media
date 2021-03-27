import React from 'react'

import {GET_POST_START, GET_POST_SUCCESS, SHARE_POST_SUCCESS, POST_LIKED_USER, REMOVE_POST_LIKED_USER, POST_SHARD_USER, REMOVE_POST_SHARD_USER, GET_USER_WON_POST_SUCCESS} from '../actions/ActionTypes'
import { auth_fail, auth_start } from '../actions/Auth'
import { GetPostLikedUser } from '../actions/Utils'

const initialState = ({
    loadingPost : false,
    allPost:[],
    sharePostInfo:null,
    postLikedUser:[],
    postSharedUser:[],
    UserWonPost:[]
})

const GetPostStart = (state, action) =>({
    ...state,
    loadingPost:true
})
const GetPostSuccss = (state, action) =>({
    ...state,
    loadingPost:false,
    allPost:action.posts
})
const GetSharePostInfo = (state, action) =>({
    ...state,
    sharePostInfo:action.shareInfo
})

const GetPostLikedUsers = (state, action) =>({
    ...state,
    postLikedUser:action.users
})
const RemovePostLikedUsers = (state, action) =>({
    ...state,
    postLikedUser:[]
})

const GetPostSharedUsers = (state, action) =>({
    ...state,
    postSharedUser:action.users
})
const RemovePostSharedUsers = (state, action) =>({
    ...state,
    postSharedUser:[]
})
const GetUserWonPost = (state, action) =>({
    ...state,
    UserWonPost: action.userWonPost
})

const PostReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_POST_START: return GetPostStart(state, action)
        case GET_POST_SUCCESS: return GetPostSuccss(state, action)
        case SHARE_POST_SUCCESS: return GetSharePostInfo(state, action)
        case POST_LIKED_USER: return GetPostLikedUsers(state, action)
        case REMOVE_POST_LIKED_USER: return RemovePostLikedUsers(state, action)
        case POST_SHARD_USER: return GetPostSharedUsers(state, action)
        case REMOVE_POST_SHARD_USER: return RemovePostSharedUsers(state, action)
        case GET_USER_WON_POST_SUCCESS: return GetUserWonPost(state, action)
        default: return state

    }

}

export default PostReducer;