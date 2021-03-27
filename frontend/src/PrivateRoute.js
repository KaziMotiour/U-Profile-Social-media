import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export const AuthenticRoute = ({component:Component, ...rest})=> {

    const isAuthenticated = useSelector(state => !!state.auth.access_token)
    console.log(isAuthenticated);
    return (
      <Route {...rest} component={props =>(
          isAuthenticated ? ( <Component  />) : (<Redirect to="/login" />)
      )}  />
    )
}

export const LogedInRoute = ({component:Component, ...rest})=> {
    const isAuthenticated = localStorage.getItem('access_token')
    return (
      <Route {...rest} component={props =>(
          isAuthenticated ? (<Redirect to="/" />) : ( <Component  />) 
      )}  />
    )
}

 
