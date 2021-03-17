    import React from 'react'
    import axios from 'axios'
import {LOGGED_IN_USER_INFO, RECOMENDED_USER, MUTUAL_FRIEND} from './ActionTypes'
import {GetPostLikedUser, GetPostSharedUser} from './Utils'



export const loggedin_user_info = (data) =>(
    {
    type: LOGGED_IN_USER_INFO,
    loggedinUserInfo: data
  
  })

  export const recomended_user = (data) =>(
    {
    type: RECOMENDED_USER,
    recomended_user: data
  
  })

  export const mutual_friend = (data) =>(
      console.log(data, 'action'),
    {
    type: MUTUAL_FRIEND,
    mutual_friend: data
  
  })

  


export const LoggedUserInfo = (config) => async dispatch =>{
        console.log(config,  'config');
    try{
            await axios.get('http://127.0.0.1:8000/profile/loggedinUser',config).then(res =>{
               
            dispatch(loggedin_user_info(res.data[0]))
        })
    }catch(err){
        console.log(err,'err');
    }


}


export const RecomendedUser = (config) => async dispatch =>{

    try{
        await axios.get('http://127.0.0.1:8000/profile/recomemdedUser/',config).then(res =>{
            dispatch(recomended_user(res.data))
        })
    }catch(err){
        console.log(err,'err');
    }

}

export const UserFollow = (username, config) => async dispatch =>{

    try{
        await axios.get(`http://127.0.0.1:8000/profile/follow/${username}`,config).then(res =>{
            
            dispatch(RecomendedUser(config))
        })
    }catch(err){
        console.log(err,'err');
    }

}
export const UserFollowFromLikedUser = (id, username, config) => async dispatch =>{
    console.log(id,'iddd');
    try{
        await axios.get(`http://127.0.0.1:8000/profile/follow/${username}`, config).then(res =>{
            dispatch(GetPostLikedUser(id, config))
        })
    }catch(err){
        console.log(err,'err');
    }

}

export const UserFollowFromSharedUser = (id, username, config) => async dispatch =>{
    console.log(id,'iddd');
    try{
        await axios.get(`http://127.0.0.1:8000/profile/follow/${username}`, config).then(res =>{
            dispatch(GetPostSharedUser(id, config))
        })
    }catch(err){
        console.log(err,'err');
    }

}


export const MutualFriend = (id, config) => async dispatch =>{

    try{
        await axios.get(`http://127.0.0.1:8000/profile/mutualfriend/${id}`,config).then(res =>{
            
            dispatch(mutual_friend(res.data))
        })
    }catch(err){
        console.log(err,'err');
    }

}
