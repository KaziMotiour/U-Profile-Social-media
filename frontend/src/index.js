import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import AuthReducer from './store/reducers/AuthReducer'
import UserInfo from './store/reducers/UserProfileReducer'
import PostReducer from './store/reducers/PostReducer'

const RootReducer = combineReducers({
  auth:AuthReducer,
  user:UserInfo,
  post:PostReducer,
})


const logger = store => {
  return next =>{
    return action =>{
        console.log('[middleware] dipatching', action)
        const result = next(action)
          console.log('[middleware] next state', store.getState())
        return result
    }
  }
} 
const  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(logger, thunk)))



ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
