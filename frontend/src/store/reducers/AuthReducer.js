import React from 'react'

import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_LOGIN_FAIL, AUTH_REGISTRATION, AUTH_REGISTRATION_FAIL, CAHNGE_PASSWORD, RESET_PASSWORD, PASSWORD_CHANGE_FILED, PASSWORD_CHANGE_SUCCESS, REMOVE_PASSWORD_CHANGE_SUCCESS, RESET_EMAIL_CHANGED_SUCCESS, RESET_EMAIL_CHANGED_FAILED, RESET_PASSSWORD_FAILED, RESET_PASSSWORD_SUCCESS, REMOVE_RESET_EMAIL_CHANGED_SUCCESS, REMOVE_RESET_PASSSWORD_SUCCESS, REMOVE_PASSSWORD_CHANGE_SUCCESS} from '../actions/ActionTypes'

import { auth_fail, auth_start } from '../actions/Auth'

const initialState = ({
    access_token : localStorage.getItem('access_token'),
    loading:false,
    login_error:null,
    registration_confirmation:null,
    registration_error:null,
    passwordChange_error:null,
    passwordChange_Success:null,
    emailSendSuccess:null,
    emailSendFailed:null,
    resetPasswordSuccess:null,
    resetPasswordFailed:null,

})

const authStart = (state, action) =>({
    ...state,
    loading:true
})
const authSuccess = (state, action) =>({
    ...state,
    access_token:action.access,
    loading:false,
   
})
const authFail = (state, action) =>({
    ...state,
    login_error:action.error,
    loading:false

})
const authLogout = (state, action) =>({
    ...state,
    access_token:null
})

const authRegistration = (state, action) =>({
    ...state,
    registration_confirmation:action.confirmation
})

const authRegistrationFail = (state, action) =>({
    ...state,
    registration_error:action.registration_error
    
})

const passwordChangeFailed = (state, action) =>(
    console.log('from error'),
    {
    ...state,
    passwordChange_error:action.passwordChangeError
    
})

const successPasswordChange = (state, action) =>(

    {
    ...state,
    passwordChange_Success: action.passwordChangedSuccess,
    passwordChange_error: null
    
})
const removeSuccessPasswordChange = (state, action) =>(

    {
    ...state,
    passwordChange_Success: null
})
const sendEmailSuccess = (state, action) =>(
    console.log(action),

    {
    ...state,
    emailSendSuccess: action.reset_emailSend_success,
    emailSendFailed:null,
    
})
const sendEmailFailed = (state, action) =>(
    console.log(action),
    {
    ...state,
    emailSendFailed:action.reset_emailSend_failed,
    emailSendSuccess: null
})

const passwordResetSuccess = (state, action) =>(

    {
    ...state,
    resetPasswordSuccess: action.reset_password_success,
    resetPasswordFailed:null,
    
})

const passwordResetFailed = (state, action) =>(
    {
    ...state,
    resetPasswordFailed:action.reset_password_failed,
    resetPasswordSuccess: null
})

const RemoveSendEmailSuccess = (state, action) =>(

    {
    ...state,
    emailSendSuccess:null,
    
})

const RemovePasswordResetSuccess = (state, action) =>(
    {
    ...state,
    resetPasswordSuccess:null,
})



const AuthReducer = (state = initialState, action) =>{
    switch(action.type){

        case AUTH_START: return authStart(state, action)
        case AUTH_SUCCESS: return authSuccess(state, action)
        case AUTH_LOGIN_FAIL: return authFail(state, action)
        case AUTH_REGISTRATION: return authRegistration(state, action)
        case AUTH_REGISTRATION_FAIL: return authRegistrationFail(state, action)
        case PASSWORD_CHANGE_FILED: return passwordChangeFailed(state, action)
        case PASSWORD_CHANGE_SUCCESS: return successPasswordChange(state, action)
        case REMOVE_PASSWORD_CHANGE_SUCCESS: return removeSuccessPasswordChange(state, action)

        case RESET_EMAIL_CHANGED_SUCCESS : return sendEmailSuccess(state, action)
        case RESET_EMAIL_CHANGED_FAILED : return sendEmailFailed(state, action)
        case RESET_PASSSWORD_SUCCESS : return passwordResetSuccess(state, action)
        case RESET_PASSSWORD_FAILED : return passwordResetFailed(state, action)
        case REMOVE_RESET_EMAIL_CHANGED_SUCCESS : return RemoveSendEmailSuccess(state, action)
        case REMOVE_RESET_PASSSWORD_SUCCESS : return RemovePasswordResetSuccess(state, action)
        default: return state

    }

}

export default AuthReducer;