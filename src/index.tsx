import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./app/store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
//reportWebVitals(console.log);
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
