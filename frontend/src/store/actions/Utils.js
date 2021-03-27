import React from 'react'
import axios from 'axios'
import {POST_LIKED_USER, REMOVE_POST_LIKED_USER, POST_SHARD_USER, REMOVE_POST_SHARD_USER, NOTIFICATION_COUNT, NOTIFICATION_LIST, REMOVE_NOTIFICATION_LIST} from './ActionTypes'
import { DataUsageSharp } from '@material-ui/icons'

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

export const NotificationCountData = (data) =>(
    {
    type:NOTIFICATION_COUNT,
    notificatonCount : data
})

export const NotificationLists = (data) =>(
    {
    type:NOTIFICATION_LIST,
    notificatonList : data
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
            
            dispatch(PostSharedUser(res.data))
        })

    }catch(err){
        console.log(err);
    }
} 

export const NotificationCount = (config) => async dispatch =>{
    try{
        await axios.get('http://127.0.0.1:8000/notification/count', config).then(res=>{
           console.log(res.data);
            dispatch(NotificationCountData(res.data.new_notification))
        })

    }catch(err){
        console.log(err);
    }
} 

export const NotificationList = (config) => async dispatch =>{
    try{
        await axios.get('http://127.0.0.1:8000/notification', config).then(res=>{
           dispatch(NotificationLists(res.data))
           dispatch(NotificationCount(config))
            
        })

    }catch(err){
        console.log(err);
    }
} 