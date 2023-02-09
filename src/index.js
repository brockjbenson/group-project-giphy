import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";

const getFavorites = (state = [], action) => {
  switch (action.type) {
    case "GET_FAVORITES":
      return action.payload;
    case "ADD_TO_FAVORITES":
      return [...state, action.payload];
    default:
      return state;
  }
};

// IL5j1z69Qi7NTLTL7j

const displaySearch = (state = [], action) => {
  switch (action.type) {
    case "SHOW_GIFS":
      return action.payload;
    default:
      return state;
  }
};

const storeInstance = createStore(
  combineReducers({
    getFavorites,
    displaySearch,
  }),
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
