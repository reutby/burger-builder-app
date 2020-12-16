import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from "redux-thunk"

import './index.css';
import App from './App';
import burgerBuilderReducer from "./store/reducers/burgerBuilder"
import ordersReducers from "./store/reducers/order";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  bbr:burgerBuilderReducer,
  order:ordersReducers
});

const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store =  {store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
