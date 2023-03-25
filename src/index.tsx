import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import store from "./store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "assets/scss/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const Component: React.FC<{}> = () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
};

root.render(
  process.env.NODE_ENV === "production" ? (
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  ) : (
    <Component />
  ),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(process.env.NODE_ENV !== "production" ? console.table : () => {});
