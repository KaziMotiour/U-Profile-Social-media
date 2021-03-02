import React from "react";
import Layout from './component/Layout'
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from './containers/Home'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Route exect path='/' component={Home}/>
        </Layout>
      </Router>
      
      
    </div>
  );
}

export default App;
