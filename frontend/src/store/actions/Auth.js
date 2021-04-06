import React from 'react'
import axios from 'axios'
import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_LOGIN_FAIL, AUTH_REGISTRATION, AUTH_REGISTRATION_FAIL, CAHNGE_PASSWORD, RESET_PASSWORD, VERIFY_JWT_TOKEN, PASSWORD_CHANGE_FILED, PASSWORD_CHANGE_SUCCESS, RESET_EMAIL_CHANGED_SUCCESS, RESET_EMAIL_CHANGED_FAILED, RESET_PASSSWORD_FAILED, RESET_PASSSWORD_SUCCESS } from './ActionTypes'

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

export const password_change_filed = (errors) =>(

  {
  type: PASSWORD_CHANGE_FILED,
  passwordChangeError: errors

})

export const password_change_success = (success) =>(
console.log(success, 'from success '),
  {
  type: PASSWORD_CHANGE_SUCCESS,
  passwordChangedSuccess: success.message

})

export const Reset_emailSend_success = (success) =>(

    {
    type: RESET_EMAIL_CHANGED_SUCCESS,
    reset_emailSend_success: success
  
  })

export const Reset_emailSend_fail = (error) =>(

    {
    type: RESET_EMAIL_CHANGED_FAILED,
    reset_emailSend_failed: error
  
  })



export const Reset_password_success = (success) =>(
  

    {
    type: RESET_PASSSWORD_SUCCESS,
    reset_password_success: success

})

export const Reset_password_fail = (error) =>(

    {
    type: RESET_PASSSWORD_FAILED,
    reset_password_failed: error
  
  })








export const UserLogin = (email, password) => async dispatch =>{

    try{
      dispatch(auth_start())
        await axios.post('https://kmotiour.pythonanywhere.com/api/token/',{email, password}).then(res =>{
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

      await axios.post('https://kmotiour.pythonanywhere.com/api/token/verify/',{token}).then(res =>{
      
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
        await axios.post('https://kmotiour.pythonanywhere.com/auth/singup/',{email, username, password, password2}).then(res =>{

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

      await axios.put('https://kmotiour.pythonanywhere.com/auth/change-password/',formData, config).then(res =>{  
        dispatch(password_change_success(res.data))

      }).catch(function (error) {
      
  
        dispatch(password_change_filed(error.response.data))
          
       })
  }catch(err){
      // console.log(err,'err');
  }


}


export const SendResetEmail = (email, config) => async dispatch =>{

  try{

      await axios.post('https://kmotiour.pythonanywhere.com/auth/password_reset/',{email}, config).then(res =>{  
        
        dispatch(Reset_emailSend_success(res.data.status))

      }).catch(function (error) {
      
       
        dispatch(Reset_emailSend_fail(error.response.data.email))
          
       })
  }catch(err){
      // console.log(err,'err');
  }


}

export const PasswordResetConfirm = (formData, config) => async dispatch =>{

  try{

      await axios.post('https://kmotiour.pythonanywhere.com/auth/password_reset/confirm/',formData, config).then(res =>{  


        dispatch(Reset_password_success(res.data.status))

      }).catch(function (error) {

        dispatch(Reset_password_fail(error.response.data))
          
       })
  }catch(err){
      // console.log(err,'err');
  }


}