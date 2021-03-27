    import React from 'react'
    import axios from 'axios'
import {LOGGED_IN_USER_INFO, RECOMENDED_USER, MUTUAL_FRIEND, USER_PFORILE, GET_FOLLWER_USER, GET_FOLLWING_USER} from './ActionTypes'
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

  export const UserProfileData = (data) =>(
    
  {
  type: USER_PFORILE,
  userProfile: data

})
export const followerUser = (user) =>({
    type:GET_FOLLWER_USER,
    followerUser : user
})

export const followingUser = (user) =>({
    type:GET_FOLLWING_USER,
    followingUser : user
})


  

export const UserProfile = (username, config) => async dispatch =>{
    try{
        await axios.get(`http://127.0.0.1:8000/profile/${username}`, config).then(res =>{
        dispatch(UserProfileData(res.data))
    })
    }catch(err){
        console.log(err,'err');
    }


}




export const LoggedUserInfo = (config) => async dispatch =>{
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

export const UserFollow = (username, profileUser, config, profile ) => async dispatch =>{
    try{
        await axios.get(`http://127.0.0.1:8000/profile/follow/${username}`, config).then(res =>{
            
            dispatch(RecomendedUser(config))
            dispatch(GetFollowerUser(profileUser, config))
            dispatch(GetFollowingUser(profileUser, config))

           {profile && dispatch(UserProfile(username, config))}
        })
    }catch(err){
        console.log(err,'err');
    }

}

export const UserFollowFromLikedUser = (id, username, config) => async dispatch =>{
   
    try{
        await axios.get(`http://127.0.0.1:8000/profile/follow/${username}`, config).then(res =>{
            dispatch(GetPostLikedUser(id, config))
        })
    }catch(err){
        console.log(err,'err');
    }

}

export const UserFollowFromSharedUser = (id, username, config) => async dispatch =>{
    
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

export const GetFollowerUser = (username, config) => async dispatch =>{
   
    try{
        await axios.get(`http://127.0.0.1:8000/profile/follower/${username}`,config).then(res =>{
            // console.log(res.data, 'followwwwwwwwww');
            dispatch(followerUser(res.data))
        })
    }catch(err){
        console.log(err,'err');
    }

}

export const GetFollowingUser = (username, config) => async dispatch =>{

    try{
        await axios.get(`http://127.0.0.1:8000/profile/following/${username}`,config).then(res =>{
            
            dispatch(followingUser(res.data))
        })
    }catch(err){
        console.log(err,'err');
    }

}


