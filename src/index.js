import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
// import { UserProvider } from "./context/UserContext";
import { Provider } from 'react-redux';
import reduxStore from './redux/store';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.scss";

const { store, persistor } = reduxStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <UserProvider> */}
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary fallback={<div class="error-message">Something went wrong</div>}>
        <App />
        </ErrorBoundary>
        </PersistGate>
      </Provider>
    {/* </UserProvider> */}
  </BrowserRouter>
  //  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
