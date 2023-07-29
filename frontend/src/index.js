import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import { NotificationsProvider } from 'reapop'

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <NotificationsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationsProvider>
  </Provider>
);
