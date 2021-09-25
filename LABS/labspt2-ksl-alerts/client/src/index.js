import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, } from 'redux';
import { Provider, } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers/reducer';
import App from "./components/container/App/App";
import "semantic-ui-css/semantic.min.css";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
   document.getElementById("root"));
