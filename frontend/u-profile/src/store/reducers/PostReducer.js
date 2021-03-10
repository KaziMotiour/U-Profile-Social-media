import React from 'react'

import {GET_POST_START, GET_POST_SUCCESS} from '../actions/ActionTypes'
import { auth_fail, auth_start } from '../actions/Auth'

const initialState = ({
    loadingPost : false,
    allPost:[],

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




const PostReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_POST_START: return GetPostStart(state, action)
        case GET_POST_SUCCESS: return GetPostSuccss(state, action)
        default: return state

    }

}

export default PostReducer;