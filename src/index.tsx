import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "app/locales";
import store from "app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./app/theme/scss/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ReduxProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
