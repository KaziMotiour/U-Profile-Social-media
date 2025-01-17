import React, {useEffect} from "react";
import Layout from './component/Layout'
import {BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import "./App.css";
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import Singup from './containers/Singup/singup'
import ForgetPassword from './containers/forgetPassword/ForgetPasswor'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Nav from './component/Nav'
import {useDispatch, useSelector} from 'react-redux'
import {AuthenticRoute, LogedInRoute} from './PrivateRoute'
import {VerifyJwtToken} from './store/actions/Auth'
import {LoggedUserInfo} from './store/actions/UserProfile'
import ProfilePage from './containers/profilePage/ProfilePage'
import UpdateProfileInfo from './containers/profileSettings/UpdateProfileInfo'
import SinglePost from './containers/Home/Feed/Post/singlePost/SinglePost'
import NotificationForMobile from './component/notification/NotificationForMobile'
import Playground from './component/AutoCompletesearch'
import {NotificationCount} from './store/actions/Utils'
import NotFound from './component/NotFound'
import ResetUserPassword from './containers/forgetPassword/ResetPassword'

function  App() {

  const accessToken = useSelector(state => state.auth.access_token)
  const dispatch = useDispatch()
  const history = useHistory()
  
  const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}

  useEffect(() =>{

    dispatch(VerifyJwtToken())
    dispatch(LoggedUserInfo(config))

    
  },[])

  useEffect(() =>{
    checkAuthenticatin()
    
  },[])
  
  const checkAuthenticatin =()=>{
    const access_token = localStorage.getItem('access_token')
    if(!access_token){
      <Redirect to="/login" />
    
  }}

  return (
    <div className="App">
      <Router>
        <Layout>
        <Switch>  
          <LogedInRoute exect path='/Login' component={Login}/>
          <LogedInRoute exect path='/singup' component={Singup}/>
          <Route exect path='/forgetpassword' component={ForgetPassword}/>
          <Route exect path='/resetPassword/:token' component={ResetUserPassword}/>
          <AuthenticRoute exect path='/accountSetings' component={UpdateProfileInfo}/>
          <AuthenticRoute exect path='/autoComplete' component={Playground}/>
          <AuthenticRoute exect path='/notification' component={NotificationForMobile}/>
          <AuthenticRoute exect path='/post/:postId' component={SinglePost}/>
          <AuthenticRoute exect path='/profile/:username' component={ProfilePage}/>
          <AuthenticRoute exect path='/' component={Home}/>
          <AuthenticRoute  component={NotFound}/>

          </Switch>
        </Layout>
      </Router>
      
    </div>
  );
}

export default App;
