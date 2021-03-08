import React from 'react'
import axios from 'axios'
import {LOGGED_IN_USER_INFO} from './ActionTypes'



export const loggedin_user_info = (data) =>(
    {
    type: LOGGED_IN_USER_INFO,
    loggedinUserInfo: data
  
  })


export const LoggedUserInfo = (config) => async dispatch =>{

    try{

        await axios.get('http://127.0.0.1:8000/profile/loggedinUser/',config).then(res =>{
            dispatch(loggedin_user_info(res.data[0]))
        })
    }catch(err){
        console.log(err,'err');
    }


}