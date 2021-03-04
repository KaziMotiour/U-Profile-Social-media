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

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
        <Switch>
          <Route exect path='/Login' component={Login}/>
          <Route exect path='/singup' component={Singup}/>
          <Route exect path='/forgetpassword' component={ForgetPassword}/>
          <Route exect path='/' component={Home}/>
          </Switch>
        </Layout>
      </Router>
      
      
    </div>
  );
}

export default App;
