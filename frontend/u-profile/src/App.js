import React from "react";
import Layout from './component/Layout'
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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

function App() {
  const accessToken = useSelector(state => state.auth.access_token)
  console.log(accessToken);
  console.log('dd');
  return (
    <div className="App">
      <Router>
        <Layout>
        <Switch>  
          <LogedInRoute exect path='/Login' component={Login}/>
          <LogedInRoute exect path='/singup' component={Singup}/>
          <LogedInRoute exect path='/forgetpassword' component={ForgetPassword}/>
          <AuthenticRoute exect path='/' component={Home}/>
          </Switch>
        </Layout>
      </Router>
      
    </div>
  );
}

export default App;
