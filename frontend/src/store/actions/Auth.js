import React from 'react'
import axios from 'axios'
import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_LOGIN_FAIL, AUTH_REGISTRATION, AUTH_REGISTRATION_FAIL, CAHNGE_PASSWORD, RESET_PASSWORD, VERIFY_JWT_TOKEN} from './ActionTypes'

export const auth_start = () =>({
      type:AUTH_START
})

export const auth_success = (token) =>({
  type:AUTH_SUCCESS,
  access:token
})

export const auth_login_fail = (errors) =>(
  // console.log(errors),
  {
    type:AUTH_LOGIN_FAIL,
    error:errors
  }
)

export const auth_logout = () =>(
  localStorage.removeItem('access_token'),  
  {
    type:AUTH_LOGOUT
  }
)

export const auth_registratin = (confirmation) =>(
  console.log(confirmation),
  {
  type: AUTH_REGISTRATION,
  confirmation: confirmation 

})

export const auth_registratin_fail = (errors) =>(
  {
  type: AUTH_REGISTRATION_FAIL,
  registration_error: errors

})





export const UserLogin = (email, password) => async dispatch =>{

    try{
      dispatch(auth_start())
        await axios.post('http://127.0.0.1:8000/api/token/',{email, password}).then(res =>{
          localStorage.setItem('access_token', res.data.access)
          dispatch(auth_success(res.data.access))
        }).catch(function (error) {
            // handle error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data.detail, 'res_data');
                const errors = error.response.data.detail
                dispatch(auth_login_fail(errors))
                // console.log(error);
                // console.log(error.response.status, 'res_status');
                // console.log(error.response.headers, 'res_haders');
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request,'req');
              } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message,'msg');
              }
              // console.log(error.config);
            })
    }catch(err){
        // console.log(err,'err');
    }


}

export const VerifyJwtToken = () => async dispatch =>{
  const token = localStorage.getItem('access_token')
  try{

      await axios.post('http://127.0.0.1:8000/api/token/verify/',{token}).then(res =>{
      
      }).catch(function (error) {

        if(error.response.data.detail!==null){
          dispatch(auth_logout())
        }
          
       })
  }catch(err){
      // console.log(err,'err');
  }


}


export const Registration = (email, username, password, password2) => async dispatch =>{
    console.log(email, username, password, password2);
    try{
        await axios.post('http://127.0.0.1:8000/auth/singup/',{email, username, password, password2}).then(res =>{
            dispatch(auth_registratin(res.data))
        }).catch(function (error) {
            // handle error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data, 'res');
                const errors = error.response.data
                dispatch(auth_registratin_fail(errors))
                console.log(error.response.status, 'res');
                console.log(error.response.headers, 'res');
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request,'req');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message,'msg');
              }
              console.log(error.config);
          })
        }catch(err){
            console.log(err);
        }
  

}


export const ChangeUserPassword = (formData, config) => async dispatch =>{

  try{

      await axios.put('http://127.0.0.1:8000/auth/change-password/',formData, config).then(res =>{
        console.log(res.data, 'updatedddddddd');
      }).catch(function (error) {
        console.log(error.response.data, 'res');

          
       })
  }catch(err){
      // console.log(err,'err');
  }


}