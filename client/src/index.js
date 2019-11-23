import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

console.log(store.getState());

const log = () => {
  console.log(store.getState());
};
log();
store.subscribe(log);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
