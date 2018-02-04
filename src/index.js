import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "semantic-ui-css/semantic.min.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { FETCH_ARTISTS, FETCH_SALES, SET_ARTIST } from "./actions/types";

const defaultState = { artists: [], loading: false, artist: {} };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ASYNC_START":
      return { ...state, artists: [], loading: true, artist: {} };
    case FETCH_ARTISTS:
      return {
        ...state,
        artists: action.artists,
        loading: false
      };
    case FETCH_SALES:
      return {
        ...state,
        sales: action.sales,
        loading: false
      };
    case SET_ARTIST:
      return {
        ...state,
        artist: action.value,
        loading: false
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
