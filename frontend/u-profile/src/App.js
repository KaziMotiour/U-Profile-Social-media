import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navber from './component/Navber'
import Nav from './component/Nav'

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/nav" component={Nav} />
          {/* <Route exect path="/" component={Navber} /> */}
      </Router> 
      <h1>Hello</h1>
      
    </div>
  );
}

export default App;
