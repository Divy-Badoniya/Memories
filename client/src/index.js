import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
