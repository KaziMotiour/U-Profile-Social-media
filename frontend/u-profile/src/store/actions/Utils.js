import React from 'react'
import axios from 'axios'
import {POST_LIKED_USER, REMOVE_POST_LIKED_USER, POST_SHARD_USER, REMOVE_POST_SHARD_USER} from './ActionTypes'

export const PostLikedUser = (users) =>(
    {
    type:POST_LIKED_USER,
    users: users
})

export const RemovePostLikedUser = () =>({
    type:REMOVE_POST_LIKED_USER,
})

export const PostSharedUser = (users) =>({
    type:POST_SHARD_USER,
    users: users
})

export const RemovePostSharedUser = () =>({
    type:REMOVE_POST_SHARD_USER,
})


export const GetPostLikedUser = (id, config) => async dispatch =>{
    try{
        await axios.get(`http://127.0.0.1:8000/post/liked-user/${id}`, config).then(res=>{
            dispatch(PostLikedUser(res.data))
        })

    }catch(err){
        console.log(err);
    }
} 

export const GetPostSharedUser = (id, config) => async dispatch =>{
    try{
        await axios.get(`http://127.0.0.1:8000/post/shared-user/${id}`, config).then(res=>{
            console.log(res.data);
        })

    }catch(err){
        console.log(err);
    }
} 